<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Illuminate\Support\Facades\Validator;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response; // Ensure this is imported for Response constants


class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){
        $input = $request->only('email', 'password');
        $jwt_token = null;
        if (!$jwt_token = JWTAuth::attempt($input)) {
        return response()->json([
        'success' => false,
        'message' => 'Invalid Email or Password',
        ], Response::HTTP_UNAUTHORIZED);
        }
        return response()->json([
        'success' => true,
        'token' => $jwt_token,
        'user' => Auth::user(), // Equivalent to auth()->user()

        
        ]);
        }




    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'role' => 'required|string|in:admin,Medecin,Patient,Pharmacien', // Role doit être admin ou user

            'avatar' => 'nullable|string', // Avatar optionnel et doit être une chaîne de caractères
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)],

            ['isActive' => false] // Initialiser isActive à false
        ));
        // Envoyer l'email de vérification
        $verificationUrl = route('verify.email', ['email' => $user->email]);
        Mail::send([], [], function ($message) use ($user, $verificationUrl) {
            $message->to($user->email)
                ->subject('Verification de votre email')
                ->html("<h2>{$user->name}! Merci de vous être inscrit sur

    notre site</h2>

    <h4>Veuillez vérifier votre email pour

    continuer...</h4>

    <a href='{$verificationUrl}'>Cliquez ici</a>");
        });
        return response()->json([
            'message' => 'User successfully registered. Please verify your
    email.',
            'user' => $user
        ], 201);
        return response()->json([
            'message' => 'User successfully registered. Please verify your

    email.',

            'user' => $user
        ], 201);
    }


    //Method verify Email
    public function verifyEmail(Request $request)
    {
        $user = User::where('email', $request->query('email'))->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found'
            ], 404);
        }
        if ($user->isActive) {
            return response()->json([
                'success' => true,
                'message' => 'Account already activated'
            ]);
        }

        $user->isActive = true;
        $user->save();
        return response()->json([
            'success' => true,
            'message' => 'Account activated successfully'
        ]);
    }


    public function verifyEmailUnique(Request $request)
    {
        try {
            // Validate the email parameter
            $validated = $request->validate([
                'email' => 'required|email',
            ]);

            // Check if the email already exists in the database
            $emailExists = User::where('email', $request->email)->exists();

            // Return the response based on whether the email exists or not
            return response()->json([
                'isUnique' => !$emailExists
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findorFail($id);
            $user->update($request->all());
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json("probleme de modification");
        }

        // Find the user by ID
        // $user = User::find($id);

        // if (!$user) {
        //     return response()->json(['message' => 'User not found'], 404);
        // }

        // // Update user details
        // $user->update($request->all());

        // return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        // $this->guard()->logout();
        return response()->json([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
    }
    /**
     * Return auth guard
     */
    private function guard()
    {
        return Auth::guard();
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */


    public function refresh()
    {
        // Refresh the token using JWTAuth
        $newToken = JWTAuth::refresh();

        return $this->createNewToken($newToken);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(auth('api')->user());
    }



    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTAuth::factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }

    public function index()
    {
        try {
            $users = User::all();
            return response()->json($users);
        } catch (\Exception $e) {
            return response()->json("probleme de récupération de la liste des users");
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json("user supprimée avec succes");
        } catch (\Exception $e) {
            return response()->json("probleme de suppression de user");
        }
    }
}
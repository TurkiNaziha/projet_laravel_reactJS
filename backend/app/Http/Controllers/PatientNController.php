<?php

namespace App\Http\Controllers;


use App\Models\PatientN;
use Illuminate\Http\Request;

class PatientNController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 

    public function index()
    {
        try {
            $patients = PatientN::with('medecin')->get(); // Inclut la le medecin lié;
            return response()->json($patients, 200);
        } catch (\Exception $e) {
            return response()->json("Sélection impossible {$e->getMessage()}");
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des données
        $validatedData = $request->validate([
            "nom" => "required|string|max:255",
            "prenom" => "required|string|max:255",
            "maladie" => "required|string|max:255",
            "email" => "required|email|max:255",
            "telephone" => "required|string|max:15",
            "medecinID" => "required|exists:medecins,id" // Valide que medecinID existe dans la table medecins
        ]);
    
        try {
            // Création d'un nouvel enregistrement
            $record = PatientN::create($validatedData);
            return response()->json($record, 201);
        } catch (\Exception $e) {
            return response()->json(["error" => "Insertion impossible", "details" => $e->getMessage()], 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $patient = PatientN::with('medecin')->findOrFail($id);
            return response()->json($patient);
        } catch (\Exception $e) {
            return response()->json("Sélection impossible {$e->getMessage()}");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $patient = PatientN::findorFail($id);
            $patient->update($request->all());
            return response()->json($patient);
        } catch (\Exception $e) {
            return response()->json("Modification impossible {$e->getMessage()}");
        }
    }
    /**
     * Remove the specified resource from storage.
     */



    public function destroy($id)
    {
        try {
            $patient = PatientN::findOrFail($id);
            $patient->delete();
            return response()->json("Patient supprimée avec succes");
        } catch (\Exception $e) {
            return response()->json("Suppression impossible {$e->getMessage()}");
        }
    }

    public function showPatientsByMed($idmed)
{
    try {
        // Récupérer tous les patients associés à un médecin spécifique
        $patients = PatientN::where('medecinID', $idmed)->with('medecin')->get();

        // Retourner la liste des patients
        return response()->json($patients);
    } catch (\Exception $e) {
        // Retourner une erreur en cas d'échec
        return response()->json("Sélection impossible : {$e->getMessage()}", 500);
    }
}

}

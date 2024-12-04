<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Medicament;
use Illuminate\Http\Request;

class MedicamentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $medicaments=Medicament::all();
            return response()->json($medicaments);
        }
        catch(\Exception $e){
            return response()->json(["probleme de récupération de la liste des medicaments"]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $medicament = new Medicament([
                "label" => $request->input("label"),
                "prix" => $request->input("prix"),
                "image" => $request->input("image"),
                "quantite" => $request->input("quantite"),
            ]);
            $medicament->save();
            return response()->json($medicament);
        }
        catch(\Exception $e){
            return response()->json("insertion impossible") ;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try{
            $medicament = Medicament::findorFail($id);
            return response()->json($medicament);
        }catch(\Exception $e){
            return response()->json("probleme de récupération") ;
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try{
            $medicament = Medicament::findorFail($id);
            $medicament->update($request->all());
            return response()->json($medicament);
        } catch(\Exception $e){
            return response()->json("probleme de modfication") ;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try{
            $medicament = Medicament::findorFail($id);
            $medicament->delete();
            return response()->json("Medicament supprimée avec succès");
        } catch(\Exception $e){
            return response()->json("probleme de suppression") ;
        }
    }
}

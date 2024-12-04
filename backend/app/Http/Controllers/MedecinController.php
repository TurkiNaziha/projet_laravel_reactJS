<?php

namespace App\Http\Controllers;

use App\Models\Medecin;
use Illuminate\Http\Request;

class MedecinController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $medecins = Medecin::all();
            return response()->json($medecins);
        } catch (\Exception $e) {
            return response()->json("probleme de récupération de la liste des medecins");
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
            "mail" => "required|email|max:255",
            "telephone" => "required|string|max:15",
            "specialite" => "required|string|max:255"
        ]);
    
        try {
            // Création d'un nouvel enregistrement
            $record = Medecin::create($validatedData);
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
            $medecin = Medecin::findOrFail($id);
            return response()->json($medecin);
        } catch (\Exception $e) {
            return response()->json("probleme de récupération des données");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $medecin = medecin::findorFail($id);
            $medecin->update($request->all());
            return response()->json($medecin);
        } catch (\Exception $e) {
            return response()->json("probleme de modification");
        }
    }
    /**
    
    
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $medecin = medecin::findOrFail($id);
            $medecin->delete();
            return response()->json("medecin supprimée avec succes");
        } catch (\Exception $e) {
            return response()->json("probleme de suppression de medecin");
        }
    }
}

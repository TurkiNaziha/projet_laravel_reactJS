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

        try {
            $medicaments = Medicament::all();
            return response()->json($medicaments);
        } catch (\Exception $e) {
            return response()->json("probleme de récupération de la liste des medicaments");
        }

    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            "nom" => "required|string|max:255",
            "label" => "required|string|max:255",
            "prix" => "required|numeric|min:0",
            "image" => "required|string",
            "quantite" => "required|integer|min:1"
        ]);

        try {
            $medicament = Medicament::create($validatedData);
            return response()->json($medicament, 201);
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
            $medicament = Medicament::findOrFail($id);
            return response()->json($medicament);
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
            $medicament = medicament::findorFail($id);
            $medicament->update($request->all());
            return response()->json($medicament);
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
            $medicament = medicament::findOrFail($id);
            $medicament->delete();
            return response()->json("medicament supprimée avec succes");
        } catch (\Exception $e) {
            return response()->json("probleme de suppression de medicament");
        }
    }



    public function medicamentsPaginate()
    {
        try {
            // Récupérer le nombre d'éléments par page (par défaut : 10)
            $perPage = request()->input('pageSize', 10);

            // Récupérer les médicaments avec pagination
            $medicaments = Medicament::paginate($perPage);

            // Retourner les résultats paginés
            return response()->json([
                'medicaments' => $medicaments->items(), // Les médicaments pour la page actuelle
                'totalPages' => $medicaments->lastPage(), // Nombre total de pages
                'currentPage' => $medicaments->currentPage(), // Page actuelle
                'totalItems' => $medicaments->total() // Nombre total d'éléments
            ]);
        } catch (\Exception $e) {
            // Gestion des erreurs
            return response()->json(["error" => "Pagination impossible : {$e->getMessage()}"], 500);
        }
    }

}

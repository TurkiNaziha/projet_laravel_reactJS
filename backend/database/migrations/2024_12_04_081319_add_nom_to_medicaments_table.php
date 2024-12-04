<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNomToMedicamentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('medicaments', function (Blueprint $table) {
            // Ajout de la colonne 'nom'
            $table->string('nom');  // Vous pouvez également ajouter d'autres contraintes comme 'nullable()' ou 'unique()'
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('medicaments', function (Blueprint $table) {
            // Supprimer la colonne 'nom' si la migration est annulée
            $table->dropColumn('nom');
        });
    }
}

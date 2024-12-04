<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('medicaments', function (Blueprint $table) {
            $table->id();
            $table->string('nom'); // Ajout de la colonne 'nom'
            $table->string('label');
            $table->double('prix'); // Correction : 'prix' en minuscule
            $table->string('image');
            $table->integer('quantite');
            $table->timestamps();
        });
        
    }

    /*
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicaments');
    }
};

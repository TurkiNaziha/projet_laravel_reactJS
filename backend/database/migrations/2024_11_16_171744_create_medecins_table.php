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
        Schema::create('medecins', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('mail');
            $table->string('telephone');
            $table->enum('specialite', [
                'Généraliste',
                'Cardiologie',
                'Dermatologie',
                'Gynécologie',
                'Pédiatrie',
                'Neurologie',
                'Ophtalmologie',
                'Psychiatrie',
                'Orthopédie',
                'Radiologie',
                'Urologie',
            ]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medecins');
    }
};

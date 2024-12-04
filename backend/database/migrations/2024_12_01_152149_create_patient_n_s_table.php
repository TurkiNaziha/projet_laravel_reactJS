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
        Schema::create('patient_n_s', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('maladie');
            $table->string('email');
            $table->string('telephone');
            $table->unsignedBigInteger('medecinID');
            $table->foreign('medecinID')
                  ->references('id')
                  ->on('medecins')
                  ->onDelete('restrict');
            $table->timestamps();
        });

     
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patient_n_s');
    }
};

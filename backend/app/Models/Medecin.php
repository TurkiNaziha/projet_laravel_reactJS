<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;


use Illuminate\Database\Eloquent\Model;


class Medecin extends Model

    //


{
    use HasFactory;

    protected $fillable =
        ['nom','prenom','mail','telephone','specialite'];

//    public function demandeM()
//    {
//        return $this->hasMany(Demande::class,'medId');
//    }

    public function patient()
    {
        return $this->hasMany(PatientN::class,'medecinID');
    }





}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientN extends Model
{

    use HasFactory;

    protected $fillable = [
        'nom','prenom','maladie','email','telephone','medecinID'
    ];
    public function medecin()
        {
            return $this->belongsTo(Medecin::class,"medecinID");
        }
}

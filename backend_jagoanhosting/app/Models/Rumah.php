<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rumah extends Model
{
    use HasFactory;

    protected $fillable = [
        'keluarga',
        'foto_rumah',
        'alamat',
        'status',
        'penghuni_id',
    ];

    public function penghuni()
    {
        return $this->belongsTo(Penghuni::class);
    }

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class);
    }

    public function riwayat()
    {
        return $this->hasMany(RiwayatPenghuni::class);
    }
}

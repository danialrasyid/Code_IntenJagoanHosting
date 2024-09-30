<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penghuni extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_lengkap',
        'foto_ktp',
        'status',
        'nomor_telepon',
        'status_menikah',
    ];

    public function rumah()
    {
        return $this->hasMany(Rumah::class);
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

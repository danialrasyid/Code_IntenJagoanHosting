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
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('penghuni_id')->constrained('penghunis')->onDelete('cascade');
            $table->foreignId('rumah_id')->constrained('rumahs')->onDelete('cascade');
            $table->date('tanggal_pembayaran');
            $table->enum('jenis_iuran', ['Satpam', 'Kebersihan']);
            $table->decimal('jumlah', 10, 2);
            $table->enum('status', ['Lunas', 'Belum']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayarans');
    }
};

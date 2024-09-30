<?php
namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Pengeluaran;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function summary()
    {
        try {
            $pemasukan = Pembayaran::sum('jumlah');
            $pengeluaran = Pengeluaran::sum('jumlah');
            $saldo = $pemasukan - $pengeluaran;

            return response()->json([
                'success' => true,
                'message' => 'Summary report berhasil diambil',
                'data' => [
                    'pemasukan' => $pemasukan,
                    'pengeluaran' => $pengeluaran,
                    'saldo' => $saldo,
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil summary report: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function monthly()
    {
        try {
            $monthlyData = Pembayaran::selectRaw('MONTH(tanggal_pembayaran) as month, SUM(jumlah) as pemasukan')
                ->groupBy('month')
                ->get()
                ->map(function ($item) {
                    $item->pengeluaran = Pengeluaran::whereMonth('tanggal_pengeluaran', $item->month)->sum('jumlah');
                    return $item;
                });

            return response()->json([
                'success' => true,
                'message' => 'Monthly report berhasil diambil',
                'data' => $monthlyData
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil monthly report: ' . $e->getMessage(),
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use Illuminate\Http\Request;

class PengeluaranController extends Controller
{
    public function index()
    {
        try {
            $pengeluaran = Pengeluaran::all();
            return response()->json([
                'success' => true,
                'message' => 'Data pengeluaran berhasil diambil',
                'data' => $pengeluaran
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data pengeluaran: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'deskripsi' => 'required|string|max:255',
            'jumlah' => 'required|numeric',
            'tanggal_pengeluaran' => 'required|date',
            'jenis_pengeluaran' => 'required|in:Rutin,Non-Rutin',
        ]);

        try {
            $pengeluaran = Pengeluaran::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Pengeluaran berhasil disimpan',
                'data' => $pengeluaran
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan pengeluaran: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $pengeluaran = Pengeluaran::findOrFail($id);
            return response()->json([
                'success' => true,
                'message' => 'Data pengeluaran berhasil diambil',
                'data' => $pengeluaran
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data pengeluaran: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'deskripsi' => 'sometimes|required|string|max:255',
            'jumlah' => 'sometimes|required|numeric',
            'tanggal_pengeluaran' => 'sometimes|required|date',
            'jenis_pengeluaran' => 'sometimes|required|in:Rutin,Non-Rutin',
        ]);

        try {
            $pengeluaran = Pengeluaran::findOrFail($id);
            $pengeluaran->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Pengeluaran berhasil diperbarui',
                'data' => $pengeluaran
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui pengeluaran: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $pengeluaran = Pengeluaran::findOrFail($id);
            $pengeluaran->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pengeluaran berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus pengeluaran: ' . $e->getMessage(),
            ], 500);
        }
    }
}

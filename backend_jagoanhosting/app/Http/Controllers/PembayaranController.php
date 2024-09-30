<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    public function index(Request $request)
{
    try {
        $perPage = $request->input('per_page', 10);
        $pembayaran = Pembayaran::with(['penghuni', 'rumah'])
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Data pembayaran berhasil diambil',
            'data' => $pembayaran
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal mengambil data pembayaran: ' . $e->getMessage(),
        ], 500);
    }
}
    public function store(Request $request)
    {
        $request->validate([
            'penghuni_id' => 'required|exists:penghunis,id',
            'rumah_id' => 'required|exists:rumahs,id',
            'tanggal_pembayaran' => 'required|date',
            'jenis_iuran' => 'required|in:Satpam,Kebersihan',
            'jumlah' => 'required|numeric',
            'status' => 'required|in:Lunas,Belum',
        ]);

        try {
            $pembayaran = Pembayaran::create($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil disimpan',
                'data' => $pembayaran
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan pembayaran: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $pembayaran = Pembayaran::with(['penghuni', 'rumah'])->findOrFail($id);
            return response()->json([
                'success' => true,
                'message' => 'Data pembayaran berhasil diambil',
                'data' => $pembayaran
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data pembayaran: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'penghuni_id' => 'sometimes|required|exists:penghuni,id',
            'rumah_id' => 'sometimes|required|exists:rumah,id',
            'tanggal_pembayaran' => 'sometimes|required|date',
            'jenis_iuran' => 'sometimes|required|in:Satpam,Kebersihan',
            'jumlah' => 'sometimes|required|numeric',
            'status' => 'sometimes|required|in:Lunas,Belum',
        ]);

        try {
            $pembayaran = Pembayaran::findOrFail($id);
            $pembayaran->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil diperbarui',
                'data' => $pembayaran
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui pembayaran: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $pembayaran = Pembayaran::findOrFail($id);
            $pembayaran->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran berhasil dihapus'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus pembayaran: ' . $e->getMessage(),
            ], 500);
        }
    }
}

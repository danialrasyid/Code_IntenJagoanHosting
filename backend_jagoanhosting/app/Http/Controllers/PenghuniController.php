<?php

namespace App\Http\Controllers;

use App\Models\Penghuni;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PenghuniController extends Controller
{
    public function index()
    {
        return response()->json(Penghuni::all(), 200);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'nama_lengkap' => 'required|string|max:255',
                'foto_ktp' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'status' => 'required|in:Tetap,Kontrak',
                'nomor_telepon' => 'nullable|string|max:15',
                'status_menikah' => 'required|in:Sudah,Belum',
            ]);

            $data = $request->all();
            if ($request->hasFile('foto_ktp')) {
                $filePath = $request->file('foto_ktp')->store('ktp', 'public');
                $data['foto_ktp'] = $filePath;
            }

            $penghuni = Penghuni::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Penghuni berhasil disimpan',
                'data' => $penghuni
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menyimpan penghuni: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $penghuni = Penghuni::find($id);

        if ($penghuni) {
            return response()->json($penghuni, 200);
        }

        return response()->json(['message' => 'Data not found'], 404);
    }

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'nama_lengkap' => 'required|string|max:255',
                'foto_ktp' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'status' => 'required|in:Tetap,Kontrak',
                'nomor_telepon' => 'required|string|max:15',
                'status_menikah' => 'required|in:Sudah,Belum',
            ]);

            $penghuni = Penghuni::findOrFail($id);

            $data = $request->all();

            if ($request->hasFile('foto_ktp')) {
                if ($penghuni->foto_ktp) {
                    Storage::disk('public')->delete($penghuni->foto_ktp);
                }

                $filePath = $request->file('foto_ktp')->store('ktp', 'public');
                $data['foto_ktp'] = $filePath;
            }

            $penghuni->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Penghuni berhasil diperbarui',
                'data' => $penghuni
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui penghuni: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $penghuni = Penghuni::find($id);

        if ($penghuni) {
            $penghuni->delete();
            return response()->json(['message' => 'Data Penghuni berhasil dihapus!'], 204);
        }

        return response()->json(['message' => 'Data not found'], 404);
    }
}

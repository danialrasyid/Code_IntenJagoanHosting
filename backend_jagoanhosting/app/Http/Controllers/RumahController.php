<?php

namespace App\Http\Controllers;

use App\Models\Rumah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class RumahController extends Controller
{
    public function index()
    {
        $rumahs = Rumah::with('penghuni')->get();

        return response()->json([
            'success' => true,
            'message' => 'Daftar rumah berhasil diambil',
            'data' => $rumahs
        ], 200);
    }


    public function store(Request $request)
    {
        $request->validate([
            'keluarga' => 'required|string|max:255',
            'foto_rumah' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'alamat' => 'required|string|max:255',
            'status' => 'required|in:Dihuni,Tidak Dihuni',
            'penghuni_id' => 'nullable|exists:penghunis,id',
        ]);

        $data = $request->all();

        if ($request->hasFile('foto_rumah')) {
            $filePath = $request->file('foto_rumah')->store('rumah', 'public');
            $data['foto_rumah'] = $filePath;
        }

        $rumah = Rumah::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Rumah berhasil disimpan',
            'data' => $rumah
        ], 201);
    }

    public function show($id)
    {
        $rumah = Rumah::with('penghuni')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Detail rumah berhasil diambil',
            'data' => $rumah
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'keluarga'    => 'nullable|string|max:255',
            'foto_rumah'  => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'alamat'      => 'nullable|string|max:255',
            'status'      => 'nullable|in:Dihuni,Tidak Dihuni',
            'penghuni_id' => 'nullable|exists:penghunis,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $rumah = Rumah::findOrFail($id);

            $dataToUpdate = [];
            if ($request->has('keluarga')) {
                $dataToUpdate['keluarga'] = $request->keluarga;
            } else {
                $dataToUpdate['keluarga'] = $rumah->keluarga;
            }

            if ($request->has('alamat')) {
                $dataToUpdate['alamat'] = $request->alamat;
            } else {
                $dataToUpdate['alamat'] = $rumah->alamat;
            }

            if ($request->has('status')) {
                $dataToUpdate['status'] = $request->status;
            } else {
                $dataToUpdate['status'] = $rumah->status;
            }

            if ($request->hasFile('foto_rumah')) {
                $foto_rumah = $request->file('foto_rumah');
                $foto_rumah->storeAs('public/rumah', $foto_rumah->hashName());

                if ($rumah->foto_rumah) {
                    Storage::disk('public')->delete($rumah->foto_rumah);
                }
                $dataToUpdate['foto_rumah'] = $foto_rumah->hashName();
            } else {
                $dataToUpdate['foto_rumah'] = $rumah->foto_rumah;
            }

            if ($request->has('penghuni_id')) {
                $dataToUpdate['penghuni_id'] = $request->penghuni_id;
            }

            $rumah->update($dataToUpdate);

            return response()->json([
                'success' => true,
                'message' => 'Data Rumah Berhasil Diperbarui!',
                'data'    => $rumah
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memperbarui rumah: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $rumah = Rumah::find($id);

            if ($rumah->foto_rumah) {
                Storage::disk('public')->delete($rumah->foto_rumah);
            }

            $rumah->delete();

            return response()->json([
                'success' => true,
                'message' => 'Data Rumah berhasil dihapus',
            ], 204);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus rumah: ' . $e->getMessage(),
            ], 500);
        }
    }
}

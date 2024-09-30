<?php

use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PenghuniController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RumahController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('penghuni', PenghuniController::class);
Route::apiResource('rumah', RumahController::class);
Route::apiResource('pembayaran', PembayaranController::class);
Route::apiResource('pengeluaran', PengeluaranController::class);

Route::get('report/summary', [ReportController::class, 'summary']);
Route::get('/report/monthly', [ReportController::class, 'monthly']);

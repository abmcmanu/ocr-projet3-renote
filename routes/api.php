<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NoteController;
use App\Http\Controllers\Api\TagController;
use Illuminate\Support\Facades\Route;

// --- Auth (public) ---
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login',    [AuthController::class, 'login']);
});

// --- Ressources protégées ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/notes',          [NoteController::class, 'index']);
    Route::post('/notes',         [NoteController::class, 'store']);
    Route::delete('/notes/{note}', [NoteController::class, 'destroy']);

    Route::get('/tags',   [TagController::class, 'index']);
    Route::post('/tags',  [TagController::class, 'store']);
});
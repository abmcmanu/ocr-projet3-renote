<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NoteController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

// --- Auth (public) ---
Route::prefix('auth')->group(function () {
    Route::post('/register',       [AuthController::class, 'register']);
    Route::post('/login',          [AuthController::class, 'login']);
    Route::post('/forgot-password',[AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
});

// --- Ressources protégées ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout',             [AuthController::class, 'logout']);
    Route::post('/auth/email/resend',       [AuthController::class, 'resendVerification']);

    Route::get('/user',             [UserController::class, 'show']);
    Route::put('/user/profile',     [UserController::class, 'updateProfile']);
    Route::put('/user/password',    [UserController::class, 'updatePassword']);
    Route::delete('/user',          [UserController::class, 'destroy']);

    Route::get('/notes',            [NoteController::class, 'index']);
    Route::post('/notes',           [NoteController::class, 'store']);
    Route::delete('/notes/{note}',  [NoteController::class, 'destroy']);

    Route::get('/tags',             [TagController::class, 'index']);
    Route::post('/tags',            [TagController::class, 'store']);
});
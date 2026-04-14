<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\VerifyEmailController;

// Vérification d'email : lien signé envoyé par Laravel — doit rester côté serveur.
Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

// Toutes les autres routes sont gérées par React Router (SPA).
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*')->name('home');
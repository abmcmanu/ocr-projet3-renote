<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'status'  => 'success',
            'message' => 'Utilisateur récupéré.',
            'data'    => $request->user(),
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name'  => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
        ]);

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return response()->json([
            'status'  => 'success',
            'message' => 'Profil mis à jour.',
            'data'    => $user,
        ]);
    }

    public function updatePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => ['required', 'string', 'current_password'],
            'password'         => ['required', 'string', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Mot de passe mis à jour.',
            'data'    => null,
        ]);
    }

    public function destroy(Request $request): JsonResponse
    {
        $request->validate([
            'password' => ['required', 'string', 'current_password'],
        ]);

        $user = $request->user();
        $user->currentAccessToken()->delete();
        $user->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Compte supprimé.',
            'data'    => null,
        ]);
    }
}
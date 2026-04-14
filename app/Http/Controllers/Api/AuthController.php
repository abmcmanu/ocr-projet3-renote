<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\Contracts\AuthServiceInterface;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthServiceInterface $authService
    ) {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->validated());

        return response()->json([
            'status'  => 'success',
            'message' => 'Compte créé avec succès.',
            'data'    => [
                'user'  => $result['user'],
                'token' => $result['token'],
            ],
        ], 201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->validated());

        return response()->json([
            'status'  => 'success',
            'message' => 'Connexion réussie.',
            'data'    => [
                'user'  => $result['user'],
                'token' => $result['token'],
            ],
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return response()->json([
            'status'  => 'success',
            'message' => 'Déconnexion réussie.',
            'data'    => null,
        ]);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $request->validate(['email' => ['required', 'email']]);

        Password::sendResetLink($request->only('email'));

        return response()->json([
            'status'  => 'success',
            'message' => 'Si ce compte existe, un lien de réinitialisation a été envoyé.',
            'data'    => null,
        ]);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $request->validate([
            'token'                 => ['required'],
            'email'                 => ['required', 'email'],
            'password'              => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password'       => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status !== Password::PasswordReset) {
            return response()->json([
                'status'  => 'error',
                'message' => __($status),
                'data'    => null,
            ], 422);
        }

        return response()->json([
            'status'  => 'success',
            'message' => __($status),
            'data'    => null,
        ]);
    }

    public function resendVerification(Request $request): JsonResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'status'  => 'success',
                'message' => 'Email déjà vérifié.',
                'data'    => null,
            ]);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json([
            'status'  => 'success',
            'message' => 'Lien de vérification envoyé.',
            'data'    => null,
        ]);
    }
}
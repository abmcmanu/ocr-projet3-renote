<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

test('a user can register via api', function () {
    $response = $this->postJson('/api/auth/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $response->assertSuccessful()
             ->assertJsonStructure(['data' => ['user', 'token']]);
});

test('a user can login via api', function () {
    $user = User::factory()->create([
        'email' => 'login@example.com',
        'password' => bcrypt('password123'),
    ]);

    $response = $this->postJson('/api/auth/login', [
        'email' => 'login@example.com',
        'password' => 'password123',
    ]);

    $response->assertSuccessful()
             ->assertJsonStructure(['data' => ['user', 'token']]);
});

test('a user can logout via api', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user, ['*']);
    
    $response = $this->postJson('/api/auth/logout');

    $response->assertSuccessful();
});

<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

test('authenticated user can fetch their profile', function () {
    $user = User::factory()->create();
    Sanctum::actingAs($user, ['*']);
    
    $response = $this->getJson('/api/user');
    
    $response->assertStatus(200)
             ->assertJsonPath('data.email', $user->email);
});

test('unauthenticated user cannot fetch profile', function () {
    $response = $this->getJson('/api/user');
    $response->assertStatus(401);
});

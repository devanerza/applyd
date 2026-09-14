<?php

use App\Models\User;

it('dashboard redirects to login when unauthenticated', function () {
    $response = $this->get('/dashboard');
    $response->assertRedirect('/login');
});

it('dashboard loads when authenticated', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/dashboard');
    $response->assertStatus(200);
});

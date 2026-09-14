<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\InterviewController;
use Illuminate\Support\Facades\Route;

Route::get('/dashboard', [ApplicationController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::resource('applications', ApplicationController::class);
    Route::patch('applications/{application}/status', [ApplicationController::class, 'updateStatus'])
        ->name('applications.update-status');

    Route::post('applications/{application}/activities', [ActivityController::class, 'store'])
        ->name('applications.activities.store');
    Route::delete('activities/{activity}', [ActivityController::class, 'destroy'])
        ->name('activities.destroy');

    Route::post('applications/{application}/interviews', [InterviewController::class, 'store'])
        ->name('applications.interviews.store');
    Route::patch('applications/{application}/interviews/{interview}', [InterviewController::class, 'update'])
        ->name('applications.interviews.update');
    Route::delete('applications/{application}/interviews/{interview}', [InterviewController::class, 'destroy'])
        ->name('applications.interviews.destroy');

    Route::get('/insights', function () {
        return inertia('Insights/Index');
    })->name('insights.index');
});

require __DIR__.'/auth.php';

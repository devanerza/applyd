<?php

namespace App\Http\Controllers;

use App\Services\AnalyticsService;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        $service = new AnalyticsService(auth()->user());

        return Inertia::render('Insights/Index', [
            'funnel' => $service->funnel(),
            'responseRate' => $service->responseRate(),
            'interviewConversion' => $service->interviewConversionRate(),
            'sourceEffectiveness' => $service->sourceEffectiveness(),
        ]);
    }
}

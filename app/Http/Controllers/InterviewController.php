<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Interview;
use App\Models\Activity;
use Illuminate\Http\Request;

class InterviewController extends Controller
{
    public function store(Request $request, Application $application)
    {
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'type' => 'required|in:technical,behavioral,screening,system_design,other',
            'title' => 'nullable|string|max:255',
            'interviewer_name' => 'nullable|string|max:255',
            'interviewer_email' => 'nullable|email|max:255',
            'scheduled_at' => 'required|date_format:Y-m-d\TH:i',
            'duration_minutes' => 'nullable|integer|min:15|max:480',
            'meeting_url' => 'nullable|url|max:255',
            'notes' => 'nullable|string',
            'preparation_checklist' => 'nullable|array',
        ]);

        $interview = Interview::create([
            ...$validated,
            'application_id' => $application->id,
            'user_id' => auth()->id(),
        ]);

        Activity::create([
            'application_id' => $application->id,
            'user_id' => auth()->id(),
            'type' => 'interview_scheduled',
            'title' => "Interview scheduled: {$validated['type']}",
            'description' => $validated['title'] ?? null,
            'activity_date' => now()->toDateString(),
        ]);

        return redirect()->back()->with('success', 'Interview scheduled successfully.');
    }

    public function update(Request $request, Application $application, Interview $interview)
    {
        if ($application->user_id !== auth()->id() || $interview->application_id !== $application->id) {
            abort(403);
        }

        $validated = $request->validate([
            'type' => 'required|in:technical,behavioral,screening,system_design,other',
            'title' => 'nullable|string|max:255',
            'interviewer_name' => 'nullable|string|max:255',
            'interviewer_email' => 'nullable|email|max:255',
            'scheduled_at' => 'required|date_format:Y-m-d\TH:i',
            'duration_minutes' => 'nullable|integer|min:15|max:480',
            'meeting_url' => 'nullable|url|max:255',
            'notes' => 'nullable|string',
            'preparation_checklist' => 'nullable|array',
        ]);

        $interview->update($validated);

        return redirect()->back()->with('success', 'Interview updated successfully.');
    }

    public function destroy(Application $application, Interview $interview)
    {
        if ($application->user_id !== auth()->id() || $interview->application_id !== $application->id) {
            abort(403);
        }

        $interview->delete();

        return redirect()->back()->with('success', 'Interview deleted successfully.');
    }
}

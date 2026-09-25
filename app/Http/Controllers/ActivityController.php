<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Application;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function store(Request $request, Application $application)
    {
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'type' => 'required|in:application_submitted,email_sent,email_received,recruiter_contacted,recruiter_response,screening,interview_scheduled,interview_completed,technical_test,offer_received,rejected,follow_up_sent,note,status_change',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'activity_date' => 'required|date',
        ]);

        Activity::create([
            ...$validated,
            'application_id' => $application->id,
            'user_id' => auth()->id(),
        ]);

        $activityDate = $validated['activity_date'];
        $today = now()->toDateString();

        $application->update([
            'last_activity_at' => $activityDate === $today ? now() : $activityDate,
        ]);

        return redirect()->back()->with('success', 'Activity logged successfully.');
    }

    public function destroy(Activity $activity)
    {
        $application = $activity->application;

        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        $activity->delete();

        $application->last_activity_at = $application->activities()
            ->max('activity_date') ?? now();
        $application->save();

        return redirect()->back()->with('success', 'Activity deleted successfully.');
    }
}

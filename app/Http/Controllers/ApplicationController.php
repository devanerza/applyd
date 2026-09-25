<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Activity;
use App\Models\Interview;
use App\Actions\DetermineApplicationHealth;
use App\Actions\DetermineNextAction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function dashboard()
    {
        $query = Application::where('user_id', auth()->id());

        // ponytail: counts/health are placeholders until Phase 2 wires
        // real health + next-action derivation; upgrade to Action classes then.
        $summary = [
            'active' => (clone $query)
                ->whereNotIn('status', ['rejected', 'withdrawn', 'ghosted'])
                ->count(),
            'waiting' => (clone $query)
                ->whereIn('status', ['applied', 'screening'])
                ->count(),
            'ghosted' => (clone $query)
                ->where('status', 'ghosted')
                ->count(),
        ];

        $needsAttention = (clone $query)
            ->whereNotIn('status', ['rejected', 'withdrawn', 'ghosted'])
            ->orderBy('last_activity_at', 'asc')
            ->limit(4)
            ->get();

        $upcomingInterviews = Interview::where('user_id', auth()->id())
            ->where('scheduled_at', '>=', now())
            ->with('application:id,company_name,role_title')
            ->orderBy('scheduled_at', 'asc')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard/Index', [
            'summary' => $summary,
            'needsAttention' => $needsAttention,
            'upcomingInterviews' => $upcomingInterviews,
        ]);
    }

    public function index(Request $request)
    {
        $query = Application::where('user_id', auth()->id());

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('company_name', 'like', "%{$search}%")
                  ->orWhere('role_title', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($source = $request->input('source')) {
            $query->where('source', $source);
        }

        $applications = $query->orderBy('last_activity_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        $healthCalculator = new DetermineApplicationHealth();
        
        $applications->getCollection()->transform(function ($app) use ($healthCalculator) {
            $app->health = $healthCalculator->execute($app);
            return $app;
        });

        $filters = [
            ['label' => 'Status', 'hasDropdown' => true],
            ['label' => 'Source', 'hasDropdown' => true],
            ['label' => 'Follow-up Due', 'active' => $request->filled('follow_up_due')],
            ['label' => 'Ghosted', 'active' => $request->input('status') === 'ghosted'],
        ];

        return Inertia::render('Applications/Index', [
            'applications' => $applications,
            'filters' => $filters,
        ]);
    }

    public function create()
    {
        return Inertia::render('Applications/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'role_title' => 'required|string|max:255',
            'job_url' => 'nullable|url|max:255',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'nullable|in:full_time,part_time,internship,contract,freelance',
            'salary_range' => 'nullable|string|max:255',
            'source' => 'nullable|in:linkedin,company_website,job_board,referral,other',
            'notes' => 'nullable|string',
            'applied_at' => 'required|date',
            'status' => 'in:applied,screening,interviewing,offer,rejected,withdrawn,ghosted',
            'recruiter_name' => 'nullable|string|max:255',
            'recruiter_email' => 'nullable|email|max:255',
            'recruiter_phone' => 'nullable|string|max:50',
            'recruiter_linkedin' => 'nullable|url|max:255',
        ]);

        $application = Application::create([
            ...$validated,
            'user_id' => auth()->id(),
            'last_activity_at' => now(),
        ]);

        Activity::create([
            'application_id' => $application->id,
            'user_id' => auth()->id(),
            'type' => 'application_submitted',
            'title' => "Application submitted to {$application->company_name}",
            'activity_date' => now()->toDateString(),
        ]);

        return redirect()->route('applications.index')->with('success', 'Application created successfully.');
    }

    public function show(Application $application)
    {
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        $application->load(['activities', 'interviews' => function ($query) {
            $query->orderBy('scheduled_at', 'desc');
        }]);

        $healthCalculator = new DetermineApplicationHealth();
        $nextActionCalculator = new DetermineNextAction();

        $nextActionMessage = $nextActionCalculator->execute($application);

        return Inertia::render('Applications/Show', [
            'application' => $application,
            'health' => $healthCalculator->execute($application),
            'nextAction' => $nextActionMessage ? [
                'title' => $nextActionMessage,
                'description' => 'Send a polite check-in email to the hiring manager.',
            ] : null,
        ]);
    }

    public function edit(Application $application)
    {
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Applications/Edit', [
            'application' => $application,
        ]);
    }

    public function update(Request $request, Application $application)
    {
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'role_title' => 'required|string|max:255',
            'job_url' => 'nullable|url|max:255',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'nullable|in:full_time,part_time,internship,contract,freelance',
            'salary_range' => 'nullable|string|max:255',
            'source' => 'nullable|in:linkedin,company_website,job_board,referral,other',
            'notes' => 'nullable|string',
            'applied_at' => 'required|date',
            'status' => 'in:applied,screening,interviewing,offer,rejected,withdrawn,ghosted',
            'recruiter_name' => 'nullable|string|max:255',
            'recruiter_email' => 'nullable|email|max:255',
            'recruiter_phone' => 'nullable|string|max:50',
            'recruiter_linkedin' => 'nullable|url|max:255',
        ]);

        $oldStatus = $application->status;

        $application->update([
            ...$validated,
            'last_activity_at' => now(),
        ]);

        if ($oldStatus !== $application->status) {
            Activity::create([
                'application_id' => $application->id,
                'user_id' => auth()->id(),
                'type' => 'status_change',
                'title' => "Status changed from {$oldStatus} to {$application->status}",
                'activity_date' => now()->toDateString(),
            ]);
        }

        return redirect()->route('applications.index')->with('success', 'Application updated successfully.');
    }

    public function destroy(Application $application)
    {
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        $application->delete();

        return redirect()->route('applications.index')->with('success', 'Application deleted successfully.');
    }

    public function updateStatus(Request $request, Application $application)
    {
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'status' => 'required|in:applied,screening,interviewing,offer,rejected,withdrawn,ghosted',
        ]);

        $oldStatus = $application->status;

        $application->update([
            'status' => $validated['status'],
            'last_activity_at' => now(),
        ]);

        if ($oldStatus !== $application->status) {
            Activity::create([
                'application_id' => $application->id,
                'user_id' => auth()->id(),
                'type' => 'status_change',
                'title' => "Status changed from {$oldStatus} to {$application->status}",
                'activity_date' => now()->toDateString(),
            ]);
        }

        return back();
    }
}

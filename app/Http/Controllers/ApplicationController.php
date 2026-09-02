<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Dashboard/Index');
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

        return Inertia::render('Applications/Index', [
            'applications' => $applications,
            'filters' => $request->only(['search', 'status', 'source']),
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
            'resume_version' => 'nullable|string|max:255',
            'cover_letter_version' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'applied_at' => 'required|date',
            'status' => 'in:applied,screening,interviewing,offer,rejected,withdrawn,ghosted',
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

        $application->load('activities', 'documents');

        return Inertia::render('Applications/Show', [
            'application' => $application,
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
            'resume_version' => 'nullable|string|max:255',
            'cover_letter_version' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'applied_at' => 'required|date',
            'status' => 'in:applied,screening,interviewing,offer,rejected,withdrawn,ghosted',
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
}

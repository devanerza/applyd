<?php

namespace App\Services;

use App\Models\User;

class AnalyticsService
{
    protected User $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function funnel(): array
    {
        $applications = $this->user->applications();

        return [
            'applied' => (clone $applications)->where('status', 'applied')->count(),
            'screening' => (clone $applications)->where('status', 'screening')->count(),
            'interviewing' => (clone $applications)->where('status', 'interviewing')->count(),
            'offer' => (clone $applications)->where('status', 'offer')->count(),
        ];
    }

    public function responseRate(): float
    {
        $total = $this->user->applications()->count();

        if ($total === 0) {
            return 0.0;
        }

        $responses = $this->user->applications()
            ->whereIn('status', ['screening', 'interviewing', 'offer', 'rejected'])
            ->count();

        return round(($responses / $total) * 100, 2);
    }

    public function interviewConversionRate(): float
    {
        $responses = $this->user->applications()
            ->whereIn('status', ['screening', 'interviewing', 'offer', 'rejected'])
            ->count();

        if ($responses === 0) {
            return 0.0;
        }

        $interviews = $this->user->applications()
            ->whereIn('status', ['interviewing', 'offer'])
            ->count();

        return round(($interviews / $responses) * 100, 2);
    }

    public function sourceEffectiveness(): array
    {
        $applications = $this->user->applications()->get();

        $sources = ['linkedin', 'company_website', 'job_board', 'referral', 'other'];
        $result = [];

        foreach ($sources as $source) {
            $total = $applications->where('source', $source)->count();
            $interviews = $applications
                ->where('source', $source)
                ->whereIn('status', ['interviewing', 'offer'])
                ->count();

            $result[$source] = [
                'total' => $total,
                'interviews' => $interviews,
                'rate' => $total > 0 ? round(($interviews / $total) * 100, 2) : 0.0,
            ];
        }

        return $result;
    }
}

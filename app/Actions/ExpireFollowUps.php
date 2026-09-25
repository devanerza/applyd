<?php

namespace App\Actions;

use App\Models\Application;
use Illuminate\Support\Facades\DB;

class ExpireFollowUps
{
    public function __invoke(): int
    {
        $graceDays = config('followup.grace_days', 2);
        $cutoffDate = now()->subDays($graceDays);

        return Application::whereNotNull('follow_up_at')
            ->where('follow_up_at', '<', $cutoffDate)
            ->update(['follow_up_at' => null]);
    }
}

<?php

namespace App\Actions;

use App\Models\Application;

class EvaluateGhostingStatus
{
    public function execute(Application $application): bool
    {
        $terminalStatuses = ['rejected', 'withdrawn', 'ghosted', 'offer'];
        
        if (in_array($application->status, $terminalStatuses)) {
            return false;
        }

        $inactivityDays = config('followup.ghosting.inactivity_days', 21);
        $minFollowUps = config('followup.ghosting.min_follow_ups', 2);

        $daysSinceActivity = $application->last_activity_at 
            ? now()->diffInDays($application->last_activity_at)
            : 999;

        $followUpCount = $application->activities()
            ->where('type', 'follow_up_sent')
            ->count();

        return $daysSinceActivity >= $inactivityDays && $followUpCount >= $minFollowUps;
    }
}

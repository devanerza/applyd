<?php

namespace App\Actions;

use App\Models\Application;

class DetermineApplicationHealth
{
    public function execute(Application $application): string
    {
        if ($application->status === 'ghosted') {
            return 'ghosted';
        }

        $ghosting = new EvaluateGhostingStatus();
        if ($ghosting->execute($application)) {
            return 'ghosted';
        }

        $daysSinceActivity = $application->last_activity_at 
            ? now()->diffInDays($application->last_activity_at)
            : 0;

        if ($daysSinceActivity >= 14) {
            return 'stale';
        }

        $followUpWindow = config("followup.windows.{$application->status}");
        
        if ($followUpWindow !== null && $daysSinceActivity >= $followUpWindow) {
            return 'needs_attention';
        }

        return 'healthy';
    }
}

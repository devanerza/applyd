<?php

namespace App\Actions;

use App\Models\Application;

class DetermineNextAction
{
    public function execute(Application $application): ?string
    {
        $terminalStatuses = ['rejected', 'withdrawn', 'ghosted'];
        
        if (in_array($application->status, $terminalStatuses)) {
            return null;
        }

        $daysSinceActivity = $application->last_activity_at 
            ? now()->diffInDays($application->last_activity_at)
            : 0;

        $followUpWindow = config("followup.windows.{$application->status}");
        
        if ($followUpWindow !== null && $daysSinceActivity >= $followUpWindow) {
            return "Follow up — no response in {$daysSinceActivity} days";
        }

        return 'Awaiting response';
    }
}

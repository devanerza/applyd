<?php

namespace App\Actions;

use App\Models\Application;
use Carbon\Carbon;

class CalculateFollowUpDueDate
{
    public function execute(Application $application): ?Carbon
    {
        $window = config("followup.windows.{$application->status}");
        
        if ($window === null) {
            return null;
        }

        if (!$application->last_activity_at) {
            return now();
        }

        $dueDate = $application->last_activity_at->copy()->addDays($window);
        
        return $dueDate->isPast() ? now() : $dueDate;
    }
}

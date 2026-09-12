<?php

return [
    'windows' => [
        'applied' => 7,       // days of inactivity before follow-up
        'screening' => 5,
        'interviewing' => 3,
        'offer' => null,      // no automated follow-up
        'rejected' => null,
        'withdrawn' => null,
        'ghosted' => null,
    ],
    'ghosting' => [
        'inactivity_days' => 21,   // days of total inactivity
        'min_follow_ups' => 2,     // follow-ups sent before ghosting
    ],
];

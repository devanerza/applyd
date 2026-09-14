<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id',
        'user_id',
        'type',
        'title',
        'interviewer_name',
        'interviewer_email',
        'scheduled_at',
        'duration_minutes',
        'meeting_url',
        'notes',
        'preparation_checklist',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'preparation_checklist' => 'array',
        'duration_minutes' => 'integer',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

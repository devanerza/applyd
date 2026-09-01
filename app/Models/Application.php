<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'role_title',
        'job_url',
        'status',
        'applied_at',
        'location',
        'employment_type',
        'salary_range',
        'source',
        'resume_version',
        'cover_letter_version',
        'notes',
    ];

    protected $casts = [
        'last_activity_at' => 'datetime',
        'follow_up_at' => 'datetime',
        'applied_at' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class)->orderBy('activity_date', 'desc');
    }

    public function documents()
    {
        return $this->belongsToMany(Document::class);
    }

    public function latestActivity()
    {
        return $this->activities()->first();
    }
}

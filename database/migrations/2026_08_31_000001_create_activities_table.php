<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('type', [
                'application_submitted',
                'email_sent',
                'email_received',
                'recruiter_contacted',
                'recruiter_response',
                'screening',
                'interview_scheduled',
                'interview_completed',
                'technical_test',
                'offer_received',
                'rejected',
                'follow_up_sent',
                'note',
                'status_change',
            ]);
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('activity_date');
            $table->timestamps();

            $table->index(['application_id', 'activity_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};

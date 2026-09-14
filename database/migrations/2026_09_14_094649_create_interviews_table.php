<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('type', ['technical', 'behavioral', 'screening', 'system_design', 'other']);
            $table->string('title')->nullable();
            $table->string('interviewer_name')->nullable();
            $table->string('interviewer_email')->nullable();
            $table->dateTime('scheduled_at');
            $table->integer('duration_minutes')->nullable()->default(60);
            $table->string('meeting_url')->nullable();
            $table->text('notes')->nullable();
            $table->json('preparation_checklist')->nullable();
            $table->timestamps();

            $table->index('scheduled_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};

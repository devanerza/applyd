<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('location')->nullable()->after('job_url');
            $table->enum('employment_type', ['full_time', 'part_time', 'internship', 'contract', 'freelance'])->nullable()->after('location');
            $table->string('salary_range')->nullable()->after('employment_type');
            $table->enum('source', ['linkedin', 'company_website', 'job_board', 'referral', 'other'])->nullable()->after('salary_range');
            $table->string('resume_version')->nullable()->after('source');
            $table->string('cover_letter_version')->nullable()->after('resume_version');
            $table->text('notes')->nullable()->after('cover_letter_version');
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn([
                'location',
                'employment_type',
                'salary_range',
                'source',
                'resume_version',
                'cover_letter_version',
                'notes',
            ]);
        });
    }
};

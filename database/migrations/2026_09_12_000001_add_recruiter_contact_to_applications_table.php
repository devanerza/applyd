<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('recruiter_name')->nullable()->after('notes');
            $table->string('recruiter_email')->nullable()->after('recruiter_name');
            $table->string('recruiter_phone', 50)->nullable()->after('recruiter_email');
            $table->string('recruiter_linkedin')->nullable()->after('recruiter_phone');
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn([
                'recruiter_name',
                'recruiter_email',
                'recruiter_phone',
                'recruiter_linkedin',
            ]);
        });
    }
};

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
        Schema::dropIfExists('application_document');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('application_document', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->string('file_name');
            $table->string('file_path');
            $table->timestamps();
        });
    }
};

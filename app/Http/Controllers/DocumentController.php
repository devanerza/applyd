<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::where('user_id', auth()->id())->get();

        return inertia('Documents/Index', [
            'documents' => $documents,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:resume,cover_letter,portfolio',
            'notes' => 'nullable|string',
        ]);

        $latestVersion = Document::where('user_id', auth()->id())
            ->where('type', $validated['type'])
            ->max('version_number') ?? 0;

        Document::create([
            ...$validated,
            'user_id' => auth()->id(),
            'version_number' => $latestVersion + 1,
        ]);

        return redirect()->back()->with('success', 'Document created successfully.');
    }

    public function destroy(Document $document)
    {
        if ($document->user_id !== auth()->id()) {
            abort(403);
        }

        $document->applications()->detach();
        $document->delete();

        return redirect()->back()->with('success', 'Document deleted successfully.');
    }
}

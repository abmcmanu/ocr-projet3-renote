<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Note\StoreNoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use App\Services\Contracts\NoteServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function __construct(
        private readonly NoteServiceInterface $noteService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $notes = $this->noteService->getAllForUser($request->user());

        return response()->json([
            'status'  => 'success',
            'message' => 'Notes récupérées.',
            'data'    => NoteResource::collection($notes),
        ]);
    }

    public function store(StoreNoteRequest $request): JsonResponse
    {
        $note = $this->noteService->create($request->user(), $request->validated());

        return response()->json([
            'status'  => 'success',
            'message' => 'Note créée.',
            'data'    => new NoteResource($note->load('tag')),
        ], 201);
    }

    public function destroy(Request $request, Note $note): JsonResponse
    {
        $this->noteService->delete($request->user(), $note);

        return response()->json([
            'status'  => 'success',
            'message' => 'Note supprimée.',
            'data'    => null,
        ]);
    }
}
<?php

namespace App\Services;

use App\Models\Note;
use App\Models\User;
use App\Services\Contracts\NoteServiceInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;

class NoteService implements NoteServiceInterface
{
    public function getAllForUser(User $user): Collection
    {
        return $user->notes()->with('tag')->latest()->get();
    }

    public function create(User $user, array $data): Note
    {
        return $user->notes()->create([
            'tag_id' => $data['tag_id'],
            'text'   => $data['text'],
        ]);
    }

    public function delete(User $user, Note $note): void
    {
        if ($note->user_id !== $user->id) {
            throw new AuthorizationException('Cette note ne vous appartient pas.');
        }

        $note->delete();
    }
}
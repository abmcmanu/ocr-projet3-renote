<?php

namespace App\Services\Contracts;

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface NoteServiceInterface
{
    public function getAllForUser(User $user): Collection;

    public function create(User $user, array $data): Note;

    public function delete(User $user, Note $note): void;
}
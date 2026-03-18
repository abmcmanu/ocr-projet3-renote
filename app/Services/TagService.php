<?php

namespace App\Services;

use App\Models\Tag;
use App\Models\User;
use App\Services\Contracts\TagServiceInterface;
use Illuminate\Database\Eloquent\Collection;

class TagService implements TagServiceInterface
{
    public function getAllForUser(User $user): Collection
    {
        return $user->tags()->latest()->get();
    }

    public function create(User $user, array $data): Tag
    {
        return $user->tags()->create([
            'name' => $data['name'],
        ]);
    }
}
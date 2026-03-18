<?php

namespace App\Services\Contracts;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface TagServiceInterface
{
    public function getAllForUser(User $user): Collection;

    public function create(User $user, array $data): Tag;
}
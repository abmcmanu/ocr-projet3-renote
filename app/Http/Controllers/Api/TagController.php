<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tag\StoreTagRequest;
use App\Http\Resources\TagResource;
use App\Services\Contracts\TagServiceInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function __construct(
        private readonly TagServiceInterface $tagService
    ) {}

    public function index(Request $request): JsonResponse
    {
        $tags = $this->tagService->getAllForUser($request->user());

        return response()->json([
            'status'  => 'success',
            'message' => 'Tags récupérés.',
            'data'    => TagResource::collection($tags),
        ]);
    }

    public function store(StoreTagRequest $request): JsonResponse
    {
        $tag = $this->tagService->create($request->user(), $request->validated());

        return response()->json([
            'status'  => 'success',
            'message' => 'Tag créé.',
            'data'    => new TagResource($tag),
        ], 201);
    }
}
<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Enums\Language;
use App\Http\Resources\LanguageResource;
use App\Support\InertiaSharedData;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;
use Inertia\Middleware;
use SocialiteUi\SocialiteUi;
use SplFileInfo;
use Tighten\Ziggy\Ziggy;

final class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if ($request->wantsModal()) {
            return [];
        }
        /** @var array{
               github: bool,
               x: bool,
               facebook: bool,
               google: bool
         } $socials */
        $socials = config('custom.socials', []);
        $availableSocials = collect($socials)->filter(fn (bool $item): bool => $item)->keys();

        $socials = collect(SocialiteUi::providers()->toArray())->filter(fn (array $item) => $availableSocials->contains($item['id']));

        return array_merge([
            ...parent::share($request),
            'name' => config('app.name'),
            'auth' => [
                'user' => $request->user()?->load('socialAccounts'),
                'can' => optional($request->user()?->loadMissing('roles.permissions'))->roles
                    ?->flatMap(function ($role) {
                        return $role->permissions ?? [];
                    })->mapWithKeys(function ($permission) {
                        $title = $permission['name'] ?? null;
                        if ($title && auth()->check()) {
                            $canDo = auth()->user()->can($title);
                            $formattedKey = str_replace(' ', '_', $title);

                            return [
                                $formattedKey => $canDo,    // Add formatted version for easy frontend access
                            ];
                        }

                        return [];
                    })?->all() ?? [],

            ],
            'socialiteUi' => [
                            'error' => $request->session()->get('socialite-ui.error'),
                            'providers' => $socials->values()->toArray(),
                            'hasPassword' => ! is_null($request->user()?->getAuthPassword()),
                        ],
            'language' => app()->getLocale(),
            'translations' => cache()->rememberForever('translations.'.app()->getLocale(), fn () => collect(File::allFiles(base_path('lang/'.app()->getLocale())))
                            ->flatMap(fn (SplFileInfo $file) => Arr::dot(
                                File::getRequire($file->getRealPath()),
                                $file->getBasename('.'.$file->getExtension()).'.'
                            ))
                            ->toArray()
            ),
            'notification' => collect(Arr::only(session()->all(), ['success', 'error', 'warning']))
                ->mapWithKeys(function ($notification, $key) {
                    return ['type' => $key, 'body' => $notification];
                }),
            'languages' => LanguageResource::collection(Language::cases()),
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'csrf_token' => csrf_token(),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'features' => collect(config('custom.features', []))->pluck('value'),
            'module' => [
                'has_team' => false,
            ],
        ], app(InertiaSharedData::class)->all());
    }
}

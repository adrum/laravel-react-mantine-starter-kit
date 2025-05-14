<?php

declare(strict_types=1);

namespace App\Filament\Resources\UserResource\Widgets;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Leandrocfe\FilamentApexCharts\Widgets\ApexChartWidget;

final class UsersCount extends ApexChartWidget
{
    /**
     * Chart Id
     */
    protected static ?string $chartId = 'usersCount';

    /**
     * Widget Title
     */
    protected static ?string $heading = 'UsersCount';

    /**
     * Chart options (series, labels, types, size, animations...)
     * https://apexcharts.com/docs/options
     */
    /** @return array<string, mixed> */
    protected function getOptions(): array
    {
        $driver = DB::getDriverName();

        if ($driver === 'sqlite') {
            $selectMonth = "strftime('%m', created_at)";
            $groupBy = DB::raw("strftime('%m', created_at)");
        } else {
            // For PostgreSQL and others that support EXTRACT(MONTH)
            $selectMonth = "to_char(created_at, 'MM')";
            $groupBy = DB::raw("to_char(created_at, 'MM')");
        }

        $usersPerMonth = User::selectRaw("$selectMonth as month, COUNT(*) as count")
            ->whereYear('created_at', now()->year)
            ->groupBy($groupBy)
            ->orderBy('month')
            ->pluck('count', 'month')
            ->all();

        // Prepare full 12-month data
        $data = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthKey = mb_str_pad((string) $i, 2, '0', STR_PAD_LEFT);
            $data[] = $usersPerMonth[$monthKey] ?? 0;
        }

        return [
            'chart' => [
                'type' => 'bar',
                'height' => 300,
            ],
            'series' => [
                [
                    'name' => 'Users Created',
                    'data' => $data,
                ],
            ],
            'xaxis' => [
                'categories' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                    ],
                ],
            ],
            'yaxis' => [
                'labels' => [
                    'style' => [
                        'fontFamily' => 'inherit',
                    ],
                ],
            ],
            'colors' => ['#f59e0b'],
        ];
    }
}

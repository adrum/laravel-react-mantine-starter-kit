<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $role = Role::create([
            'name' => 'super_admin',
        ]);

        Permission::create([
            'name' => 'view_log',
            'guard_name' => 'web',
        ]);

        $role->givePermissionTo(Permission::all());

        $user = User::factory()->create([
            'name' => 'Admin',
            'email' => 'mobistyle35@gmail.com',
            'password' => bcrypt('Asakaboi35'),
        ]);

        $user->assignRole('super_admin');
    }
}

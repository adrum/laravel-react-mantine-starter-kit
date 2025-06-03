<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use InterNACHI\Modular\Support\ModuleRegistry;
use Modules\Team\Providers\TeamServiceProvider;

abstract class TestCase extends BaseTestCase
{
     protected function setUp(): void
    {
        parent::setUp();

        $this->loadModuleRoutes();
    }

    protected function loadModuleRoutes(): void
    {
        $registry = $this->app->make(ModuleRegistry::class);

        /* $registry->modules()->each(function ($module) { */
        /*     $module->routes(); */
        /* }); */
    }
}

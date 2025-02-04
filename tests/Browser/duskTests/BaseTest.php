<?php

namespace Tests\Browser\duskTests;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class BaseTest extends DuskTestCase
{
    protected $valEmail = 'stracke.ali@example.net';
    protected $valPassword = 'password';

    protected function enterCredentials(Browser $browser)
    {
        $browser->assertVisible('.card-body.login-card-body')
                ->type('email', $this->valEmail)
                ->type('password', $this->valPassword)
                ->press('Sign In')
                ->pause(1000);

        echo "Credentials successfully inputted\n";
    }

    protected function logout(Browser $browser)
    {
        $browser->click('.sidebar .mt-2 ul li.nav-item:nth-of-type(7) a')
                ->pause(1000);
    }
}

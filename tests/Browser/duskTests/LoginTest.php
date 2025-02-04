<?php

namespace Tests\Browser\duskTests;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;
use Exception;

// class LoginTest extends DuskTestCase
class LoginTest extends BaseTest
{
    
//TEST METHODS=======================================================================================================
    
    /**
     * @test
     */
    public function loginUsingValidCredentials(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->assertPathIs('/login');

        $this->enterCredentials($browser);
            $browser->assertPathIs('/product')
                    ->assertSeeIn('.content-header', 'Products');

        $this->logout($browser);
        });
    }

    /**
     * @test
     */
    public function loginUsingInvalidCredentials(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->waitForLocation('/login')
                    ->assertPathIs('/login');

            $this->enterCustomCredentials($browser, 'invalid@example.com', 'invalidpassword');

            // Assert that the user is not redirected to the /product page
            $browser->assertPathIsNot('/product');

        });
    }

    /**
     * @test
     */
    public function loginUsingEmptyFields(): void
    {
        $this->browse(function (Browser $browser) {
            $browser->visit('/')
                    ->waitForLocation('/login')
                    ->assertPathIs('/login');

            $this->enterCustomCredentials($browser, '', '');

            // Assert that the user is not redirected to the /product page
            $browser->assertPathIsNot('/product');
            
            //Assert error messages are displayed
            $browser->assertSee('The email field is required.') && 
            $browser->assertSee('The password field is required.');
        });
    }

    //Helper method
    protected function enterCustomCredentials(Browser $browser, string $email, string $password)
    {
        $browser->assertVisible('.card-body.login-card-body')
                ->type('email', $email)
                ->type('password', $password)
                ->press('Sign In')
                ->pause(1000);

        echo "Credentials successfully inputted\n";
    }

}
<?php

namespace Tests\Browser\duskTests;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

//The products list and videos page is not working as expecteed so I made the test solely for the sidebar navigation
class NavigationTest extends BaseTest
{
    protected $sideBarButtons = 'ul li.nav-item';

    /**
     * @test
     */
    public function testSideBarNavigation(): void 
    {
        echo "Test Sidebar";
        $this->browse(function (Browser $browser){
            $browser->visit('/');

        $this->enterCredentials($browser);
        
        $browser->assertPathIs('/product')
        ->assertSeeIn('.content-header', 'Products');

        //Clicking on each sidebar button and asserting port 
        $browser->click($this->sideBarButtons . ':nth-of-type(2) a')
                ->assertPathIs('/product');

        $browser->click($this->sideBarButtons . ':nth-of-type(3) a')
                ->assertPathIs('/product/form');

        $browser->click($this->sideBarButtons . ':nth-of-type(5) a')
                ->assertPathIs('/videos');

        $this->logout($browser);
        $browser->assertPathIs('/login');
        });
    }
    
    
    /**
    * @test
    */
    public function testLogOut(): void
    {
        echo "Test logout";
        $this->browse(function (Browser $browser) {
            $browser->visit('/');

        $this->enterCredentials($browser);
        $browser->assertPathIs('/product')
        ->assertSeeIn('.content-header', 'Products');

        $this->logout($browser);
        $browser->assertPathIs('/login');

        
        });
    }

}




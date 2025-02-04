<?php

namespace Tests\Browser\duskTests;

use Facebook\WebDriver\Exception\ElementClickInterceptedException;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

use function PHPSTORM_META\type;

class CreateProductTest extends BaseTest
{
    protected $createProductButton = '.sidebar .mt-2 ul li.nav-item:nth-of-type(3) a';
    protected $nextButton = '.card-footer div a';
    protected $defFilePath = 'storage/app/public/forUpload/upload1.jpg';
    protected $calendar = 'div .dp__menu_inner';
    protected $successModal = '.swal2-popup.swal2-modal.swal2-icon-success.swal2-show';
    protected $successModalButton = '.swal2-confirm.swal2-styled.swal2-default-outline';


    //Before Method 
    public function setUp(): void {
        parent::setUp(); // Make sure to call the parent setUp()

        $this->browse(function (Browser $browser) {
            $browser->visit('/');
    
            $this->enterCredentials($browser);

            $browser->assertPathIs('/product')
                    ->assertSeeIn('.content-header', 'Products');
            });
    }
    
    /**
     * @test
     */
    public function createProduct(): void //Create Prodeuct
    {
        $this->browse(function (Browser $browser) {
            $browser->assertVisible($this->createProductButton)
                    ->click($this->createProductButton)
                    ->assertVisible('.row .card.p-2')
                    ->assertPathIs('/product/form')
                    
                    //Entering Details
                    ->type('input.form-control','Test123!@#')
                    ->select('select.form-control', 3)
                    ->type('.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred', 'Test123!@#')
                    ->pause(1000)
                    ->click($this->nextButton);
                    
                    //File Upload
            $browser ->attach('input[type="file"]', $this->defFilePath)
                    ->click('.row div a.btn.btn-dark');

                    //Selecting Date
            $browser->click('.dp__input_wrap input')//reveals the calendar
                    ->assertPresent($this->calendar)
                    ->clickAtXPath('//div[@class="dp__calendar_item"]//div[text()="6"]')
                    ->click('.dp__action_button.dp__action_select')
                    ->click('.btn.btn-dark');
            
            $browser->waitFor($this->successModal)
                    ->assertSeeIn($this->successModal, 'Successfully Saved!')
                    ->click($this->successModalButton)
                    ->assertPathIs('/product');


            echo "Product successfully created\n";

        });
    }


//HELPER METHODS
public function enterDetails(Browser $browser, string $name, string $category, string $description, string $filePath): void  {
    $browser->assertVisible($this->createProductButton)
    ->click($this->createProductButton)
    ->assertVisible('.row .card.p-2')
    ->type('input.form-control', $name)
    ->select('select.form-control', $category)
    ->type('.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred', $description)
    ->click($this->nextButton)
    ->pause(1000);

    $browser->attach('input[type="file"]', $filePath);
}

public function selectDate(Browser $browser, String $day): void {
    $browser->assertPresent($this->calendar)
            ->clickAtXPath('//div[@class="dp__calendar_item"]//div[text()="'.$day.'"]');
    }

}

# PRAXXYS QA Engineer Assessment

This project is a Laravel Dusk and Playwright based automation project made for ui and functional testing for PRAXXYS's Qa Engineer assessment exam. This features a comprehensive test coverage on the mock website with test report and cross-browser testing capabilities. The test validates various scenarios such as page navigation and product creation. 

Key Features
- Cross browser testing with Playwright(Chrome, Firefox)
- Test Report (Playwright)
- Implemented Page object model, fixture, and assertions using both testing tools
- User flow focused test scripts 


### System Specifications

| Requirements | Versions |
| :----------: | :------: |
|   LARAVEL    |   10.x   |
|     PHP      |  ^8.1.10 |
|    MYSQL     | ^10.4.25 |
|  PLAYWRIGHT  | ^1.50.1  |
|  LARAVEL DUSK  |  ^7.0  |

## Project Structure

```plaintext
PRAXXYS_QaEngineer_Assessment
├── tests/
│   ├── Browser/
│        ├── duskTests/
│        |   ├── BaseTest.php
│        |   ├── CreateProductTest.php
│        |   ├── LoginTest.php
│        |   ├── NavigationTest.php
│        |  
│        ├── playwrightTests/
│            ├── baseTest.ts
│            ├── createProduct.spec.ts
│            ├── loginPage.spec.ts
│            ├── productPage.spec.ts
│
├── phpunit.xml
├── playwright.config.js
```

- **duskTests**: Contains tests using `Laravel Dusk`.
- **playwrightTests**: Contains tests using `Playwright`.
- **playwright.config.js**: Contains playwright configurations.
- **testng.xml**: Contains dusk configurations.

## Configuration

### 1. Clone this repository.

```bash
$ git clone https://github.com/ericnicdao069/backend-dev-exam.git
```

### 2. Recreate environment variable file.

```bash
$ cp .env.example .env
```

### 3. Install composer and npm dependencies.

```bash
$ composer install && npm install
```

### 4. Generate Application Key.

```bash
$ php artisan key:generate
```

### 5. Create your DB and update your DB configs in `.env`.

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

### 6. Execute Database Migration and Seeders.

```bash
$ php artisan migrate --seed
```

### 7. Create a symlink for Storage in Public Directory.

```bash
$ php artisan storage:link
```

### 8. Generate Ziggy routes.

```bash
$ php artisan ziggy:generate
```

### 9. Run local server.

```bash
$ php artisan serve
```

### 10. Frontend Build.

```bash
$ npm run dev
$ npm run build
```

## Testing Setup

### **Laravel Dusk Setup**

1. Install Laravel Dusk:
   ```bash
   $ composer require --dev laravel/dusk
   ```

2. Register Dusk Service Provider:
   ```bash
   $ php artisan dusk:install
   ```

3. Run Dusk tests:
   ```bash
   $ php artisan dusk
   ```


### **Playwright Setup**

1. Install Playwright:
   ```bash
   $ npm i -D @playwright/test
   ```

2. Install Playwright browsers:
   ```bash
   $ npx playwright install
   ```

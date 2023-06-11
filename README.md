## Installation 
Make sure you have environment setup properly. You will need PHP8.1, composer and Node.js.

1. Download the project (or clone using GIT)
2. Configure Database credentials `DB_DATABASE`, `DB_USERNAME` and `DB_PASSWORD` in `.env`
3. Navigate to the project's root directory using terminal
4. Run `composer install`
5. Set the encryption key by executing `php artisan key:generate --ansi`
6. Run migrations `php artisan migrate --seed`
7. Start local server by executing `php artisan serve`
8. Open new terminal and navigate to the `react` folder
9. Adjust the `VITE_API_BASE_URL` parameter
9. Run `npm install`
10. Run `npm run dev` to start vite server for React

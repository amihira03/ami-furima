#!/bin/bash
cd /var/www
php artisan config:cache
php artisan storage:link

# PHP-FPM をバックグラウンドで起動
php-fpm -D

# Nginx をフォアグラウンドで起動
nginx -g "daemon off;"

#!/bin/bash
cd /var/www
php artisan config:cache
php artisan storage:link

# PORTが未設定の場合は8080をデフォルトに
export PORT=${PORT:-8080}

# Nginx設定にPORTを反映
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf > /tmp/default.conf
cp /tmp/default.conf /etc/nginx/conf.d/default.conf

# PHP-FPM をバックグラウンドで起動
php-fpm -D

sleep 2

# Nginx をフォアグラウンドで起動
nginx -g "daemon off;"

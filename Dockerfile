FROM php:8.1-fpm

# Nginx インストール
RUN apt update && apt install -y \
    nginx \
    default-mysql-client \
    zlib1g-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo_mysql zip

# Composer インストール
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer \
    && composer self-update

# php.ini
RUN echo "date.timezone = Asia/Tokyo" > /usr/local/etc/php/php.ini && \
    echo "[mbstring]" >> /usr/local/etc/php/php.ini && \
    echo "default_charset = UTF-8" >> /usr/local/etc/php/php.ini && \
    echo "mbstring.language = Japanese" >> /usr/local/etc/php/php.ini && \
    echo "post_max_size = 20M" >> /usr/local/etc/php/php.ini && \
    echo "upload_max_filesize = 20M" >> /usr/local/etc/php/php.ini

WORKDIR /var/www

# Nginx 設定
COPY docker/nginx/railway.conf /etc/nginx/conf.d/default.conf

# アプリケーションのコピー
COPY src/ /var/www/

# Composer依存関係インストール
RUN composer install --no-dev --optimize-autoloader

# ストレージのパーミッション設定
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# 起動スクリプト
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]

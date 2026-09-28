FROM php:8.2-cli-alpine

WORKDIR /app

RUN apk add --no-cache \
    git \
    curl \
    nodejs \
    npm \
    mysql-client \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /app

COPY composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader \
    && npm ci \
    && npm run build

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

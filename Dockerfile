FROM php:7.2-apache-stretch

Maintainer Alan Drees (alan.drees@cobersolutions.com)

###
#
# Install software/extension dependencies
#
###
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libkrb5-dev \
    libmcrypt-dev libpq-dev libssl-dev libc-client2007e-dev libxml2-dev \
    libkrb5-dev git zip unzip gnupg \
    && docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr \
    && docker-php-ext-install gd \
    && pecl install mcrypt-1.0.1 \
    && docker-php-ext-enable mcrypt \
    && docker-php-ext-install pdo \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install pdo_pgsql \
    && docker-php-ext-install zip \
    && docker-php-ext-install soap \
    && docker-php-ext-install sockets \
    && docker-php-ext-configure imap --with-imap-ssl --with-kerberos \
    && docker-php-ext-install imap \
    && a2enmod rewrite

###
#
# Set the working directory to /var/www
#
###
WORKDIR /var/www

###
#
# Clone in the composer/npm installation scripts
#
###
RUN git clone https://github.com/CoberInteractiveTeam/composer_npm_install /opt/support/cni

###
#
# Clone in the env-to-version directory script
#
###
RUN git clone https://github.com/CoberInteractiveTeam/version /opt/support/version

###
#
# Clone the source into the container
#
###
ARG branch=master

COPY . /src

RUN git clone /src --branch $branch --single-branch /tmp/src

###
#
# Install the source into the /var/www directory
#
###
RUN cd /

RUN rmdir /var/www/html && rmdir /var/www/ \
    && mv /tmp/src/src /var/www

###
#
# Copy container files:
# 1. Entrypoint
# 2. Apache configuration
# 3. Support scripts
#
##
RUN  mv /tmp/src/build/entrypoint.sh / \
     && mv /tmp/src/build/app.conf /etc/apache2/sites-available/000-default.conf

###
#
# Build the version information to be stored in the container
#
###
RUN /opt/support/version/Version /tmp/src/.env /version

###
#
# Remove Source
#
###
RUN rm -rf /tmp/src && rm -rf /src

###
#
# Install build tools:
# 1. Composer
# 2. NPM
#
###
RUN /opt/support/cni/install_composer \
    && /opt/support/cni/install_npm \
    && touch /var/www/.env

###
#
# Install the application dependencies
#
###
RUN composer install

##
#
# Install the NPM dependencies
# & build the production assets
#
###
RUN npm install \
    && npm run production

###
#
# Ensure that the permissions are set correctly
#
###
RUN chown -R www-data:www-data \
	/var/www/storage \
	/var/www/bootstrap/cache

###
#
# Remove Composer & NPM
#
###
RUN /opt/support/cni/remove_composer \
    && /opt/support/cni/remove_npm

###
#
# Remove Installed NPM Packages
#
###
RUN rm -rf /var/www/node_packages
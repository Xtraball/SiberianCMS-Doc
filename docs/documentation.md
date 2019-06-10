# Requirements

[Edit this on Github](https://github.com/Xtraball/SiberianCMS-Doc/edit/master/docs/documentation.md)

## Software

* Production server OS: `Linux`

* Local development **only**:
    
    * `OSX` with [homebrew](http://brew.sh/)
    
    * `Windows` with [bash](https://docs.microsoft.com/fr-fr/windows/wsl/install-win10)
    
* OpenSSL >=1.0.1

    * with TLS v1.2 support
    
* CURL with HTTP/2 support

* [Apache](#apache) or [Nginx](#nginx)

* PHP

    * version: `7.0 -> 7.2`
    
    * extensions: `gd`, `pdo_mysql`, `SimpleXML`, `curl`, `dom`, `SQLite3`.
    
    * functions: `exec()`
    
    * parameters: `allow_url_fopen = On`, `memory_limit >= 256M`

* MySQL/MariaDB >=5.5 with InnoDB/XtraDB engine

* Binaries: 

    * required: `zip`, `unzip`

    * optional: `pngquant` or `optipng`, `jpegoptim`

# Installation

## Configuration

1. First you will need to either checkout the project `git clone https://github.com/Xtraball/Siberian.git`

    or download the [zip archive](https://github.com/Xtraball/Siberian/archive/master.zip) then extract it on your webserver.

2. Setup your empty database and user

3. Configure your environment with [apache](#apache) or [nginx](#nginx)

### Apache

If you are running under Apache, be sure that the directive `AllowOverride all` is working, unless the `.htaccess` configuration will fail.

```
<VirtualHost [IP]:80>
        ServerName [yourdomain.tld]

		CustomLog [/path/to/siberiancms]/var/log/httpd.access_log combined
		ErrorLog [/path/to/siberiancms]/var/log/httpd.error_log

		DirectoryIndex index.php

        DocumentRoot [/path/to/siberiancms]

        <Directory [/path/to/siberiancms]>
                Options Indexes FollowSymLinks
                AllowOverride all
        </Directory>

</VirtualHost>
```


### Nginx

If you are running under Nginx, all you need is in the current configuration, 
please check the `fastcgi` options as they may vary depending on your installation

```
server {
    listen 80;

	root [/path/to/siberiancms];
		
	access_log [/path/to/siberiancms]/var/log/nginx.access_log;
	error_log [/path/to/siberiancms]/var/log/nginx.error_log;

	index index.php index.html index.htm;

	server_name [yourdomain.tld];
	
	location ~ ^/app/configs {
        deny all;
    }
    
    # Let's Encrypt configuration
    location = /.well-known/check {
        default_type "text/plain";
        try_files $uri =404;
    }

    location ^~ /.well-known/acme-challenge/ {
        default_type "text/plain";
        try_files $uri =404;
    }

	location / {
		try_files $uri /index.php?$query_string;
	}

	location ~ \.php$ {
		fastcgi_index index.php;
		fastcgi_pass 127.0.0.1:9000;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
		include fastcgi_params;
		fastcgi_buffers 256 128k;
		fastcgi_connect_timeout 300s;
		fastcgi_send_timeout 300s;
		fastcgi_read_timeout 300s;
	}

    location ~* ^.+.(js|css|png|jpg|jpeg|gif|ico|html)$ {
		access_log        off;
		log_not_found     off;
		expires           0;
	}
	
	location ~ /\. {
		access_log off;
		log_not_found off;
		deny all;
	}

	gzip on;
	gzip_min_length  1000;
	gzip_proxied any;
	gzip_types text/plain application/xml text/css text/js application/x-javascript;
	
	client_max_body_size 128M;

}
```

When you're done with the previous steps, reload your web server.

Ensure `post_max_size` & `upload_max_filesize` are higher than 32M (64-128M recommended) at least, in case of large updates


## Web installer

* Go to `http://yourdomain.tld` then follow the instructions

![welcome](img/install-sae.gif)
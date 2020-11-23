CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Usage
 * Maintainers


INTRODUCTION
------------

-The Easy Breadcrumb module provides configurable breadcrumbs that improve on
This project is a service built in NodeJS, contains the following endpoints:
- [ ] /url (GET): Returns all stored URLs and their shorted versions.
- [ ] /url/:code (GET): Redirects to the full URL associated to a shorted URL.
- [ ] /url (POST): Receives a URL as a parameter and return a shorted URL.
- [ ] /url/bulk (POST): Allows the bulk submission of URLs to short.


REQUIREMENTS
------------

- [ ] Node JS version 14.15.1 or higher.
- [ ] NPM version 6.14.8 or higher.
- [ ] MongoDB version 4.0.0 or higher.


INSTALLATION
------------

    1. git clone https://github.com/frankpech06/interview.git
    2. cd interview/back_end
    3. npm install
    4. In interview/back_end, Create a .env file with the following values:
        4.1. PORT=<PORT_TO_USE>
        4.2. API_URL=<SERVER_URL>/url
        4.3. MONGO_URL=mongodb+srv://<DB_USER>:<DB_PASSWORD>@<DB_HOST>/urls?retryWrites=true&w=majority
    5. node src/server.js

Configurable parameters:
 * <PORT_TO_USE>: Port where the server will be listen. Example: 8000
 , 8080. Type: String.
 * <SERVER_URL>: URL where the project is running. Example: http://localhost, 
 http://localhost:8000. Type: String.
 * <DB_USER>: Username to connect to the database. Type: String.
 * <DB_PASSWORD>: Password to connect to the database. Type: String. 
 * <DB_HOST>: URL where the database is running. Type: String


USAGE
-------------

- [ ] /url (GET):

    1. curl <HOSTNAME>/url

- [ ] /url/:code (GET):

    1. curl <HOSTNAME>/url/<SHORT_URL_CODE>

- [ ] /url (POST):

    1. curl -X POST -H "Content-Type: application/x-www-form-urlencoded" 
    -d "url=<FULL_URL>" <HOSTNAME>/url

- [ ] /url/bulk (POST):

    1. curl -X POST -F links=@<PATH_TO_FILE> -F download=<OPTION> 
    [--output <DOWNLOAD_FILE_NAME>] <HOSTNAME>/url/bulk

Configurable parameters:
 * <HOSTNAME>: URL where the project is running. Example: http://localhost, 
 http://127.0.0.1. Type: String.
 * <SHORT_URL_CODE>: Part of the shorted URL passed to the server. 
 Example: ikYuprl_ol. Type: String.
 * <FULL_URL>: Full URL to short. Example: https://www.google.com. Type: String.
 * <PATH_TO_FILE>: Path where the text file to upload is stored. Example:
 c:\Users\anon\links.txt. Type: String. Allowed file types: TXT.
 * <OPTION>: 1 if we want to download a file with the shorted links. 0 if we
 just want the URLs in JSON. Type: Int. Allowed values: [1, 0].
 If the value is 1, then --output option is required.
 * <DOWNLOAD_FILE_NAME>: Path where the text file to download will be stored. 
 Example: c:\Users\anon\shortedLinks.txt. Type: String.


MAINTAINERS
-----------

 * Francisco Escobedo - https://organization.com/u/francisco-escobedo

Supporting organization:

 * Yellowme - https://yellowme.mx/

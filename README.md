# Getting started
Favorite movies application running on React as front and spring-boot as back
## Starting the project using docker-compose
using pre-built fe and be images
front-end: `martintonts/omdb`
back-end: `martintonts/omdb-api`
 example docker-compose.yml
```
version: '3'
services:
    backend:
        image: martintonts/omdb-api
        container_name: be
        ports:
        - 8080:8080
    frontend:
        image: martintonts/omdb
        container_name: fe
        ports:
        - 80:80
```
## Or open project in IDE
Run spring-boot application(back-end)

Next open terminal and go to /frontend and follow the guide
* [React app](frontend/README.md)
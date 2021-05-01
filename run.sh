#!/bin/sh

docker-compose down
docker rmi backend_im
docker rmi nginx_im

docker-compose up -d

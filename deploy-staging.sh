#!/bin/sh

if ([ "$TRAVIS_BRANCH" == "master" ] || [ "$TRAVIS_BRANCH" == "develop" ] || [ ! -z "$TRAVIS_TAG" ]) && [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  docker build -t mihailts/hypecrafter-frontend -f frontend/Dockerfile ./frontend
  docker build -t mihailts/hypecrafter-nginx -f nginx/Dockerfile ./nginx
  docker build -t mihailts/hypecrafter-shared -f shared/Dockerfile ./shared
  docker build -t mihailts/hypecrafter-backend -f backend/Dockerfile ./backend
  docker build -t mihailts/hypecrafter-payment -f payment/Dockerfile ./payment
  docker build -t mihailts/hypecrafter-notification -f notification/Dockerfile ./notification
  docker build -t mihailts/hypecrafter-gateway -f gateway/Dockerfile ./gateway
  # Log in to the docker CLI
  echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
  # Take those images and push them to docker hub
  docker push mihailts/hypecrafter-frontend
  docker push mihailts/hypecrafter-nginx
  docker push mihailts/hypecrafter-shared
  docker push mihailts/hypecrafter-backend
  docker push mihailts/hypecrafter-payment
  docker push mihailts/hypecrafter-notification
  docker push mihailts/hypecrafter-gateway
else
  echo "This branch will not be deployed"
fi
## Continuous Integrations

### Travis CI
[![Build Status](https://travis-ci.org/sergiofilhowz/node-api-skeleton.svg?branch=master)](https://travis-ci.org/sergiofilhowz/node-api-skeleton)


## CircleCI
[![CircleCI](https://circleci.com/gh/sergiofilhowz/node-api-skeleton.svg?style=svg)](https://circleci.com/gh/sergiofilhowz/node-api-skeleton)

## Technologies:

* express
* express-power-router
* sequelize
* socket.io
* acqua
* saphyre-data

Tests were developed with mocha.

NodeJS version used was 7.0.1

# Instructions on how to install

## Before start
    - npm install
    - configure config/default.json file

## To start
    - npm start

## Before test backend
    - create a new mysql database instance
    - configure config/test.json file

## To test backend
    - npm test
    - npm run cover (for coverage report)
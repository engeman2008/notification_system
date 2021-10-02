#!/bin/bash

cd publisher
npm run start &

cd ..
cd subscriber
npm run start




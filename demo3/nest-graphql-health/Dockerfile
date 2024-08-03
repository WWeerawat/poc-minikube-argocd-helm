FROM node:12.22.7-alpine

WORKDIR /home/app

RUN apk update && apk add tzdata curl
ENV TZ="Asia/Bangkok"
EXPOSE 80/tcp

COPY package* .npmrc* ./
RUN npm install

COPY . ./
RUN npm run build

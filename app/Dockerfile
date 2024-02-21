FROM node:20.11.0-alpine

WORKDIR /usr/app

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build:server

CMD ["npm", "run", "start:server"]


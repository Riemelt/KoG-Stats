FROM node:21.6.0

WORKDIR /usr/app

COPY . .

RUN npm install

CMD ["npm", "run", "start:server"]


FROM node:alpine

WORKDIR /usr/primeira-api
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
FROM node:24.11.1

WORKDIR /usr/app

COPY package*.json ./
COPY .env ./

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

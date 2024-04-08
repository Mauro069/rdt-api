FROM node:20

RUN npm install -g ts-node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

CMD ["ts-node", "src/index.ts"]
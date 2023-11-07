FROM node:latest

WORKDIR /app

COPY . .

ENV PORT 5000
ENV RESENDID  're_5ZNqBbhJ_MqmzrwUy1ns3zB5GMYSP2gXd'

RUN npm install

EXPOSE 5000

CMD [ "node", "src/index.js" ]
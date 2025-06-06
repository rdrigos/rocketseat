FROM node:22.15.0-alpine3.21

WORKDIR /usr/src/app

COPY . .
RUN yarn install

EXPOSE 3333

CMD ["yarn", "run", "start"]

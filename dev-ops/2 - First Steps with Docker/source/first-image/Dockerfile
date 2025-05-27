# Etapa de build (construção da aplicação)
FROM node:22.15.0-alpine3.21 AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn run build
RUN yarn install --production && yarn cache clean

# Etapa final (container para produção)
FROM node:22.15.0-alpine3.21

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "run", "start:prod"]

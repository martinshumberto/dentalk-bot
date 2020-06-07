FROM node:alpine AS build

RUN mkdir -p /usr/app/node_modules && chown -R node:node /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN npm install
COPY . .
ENV NODE_ENV=production

USER node
RUN npm run build

FROM node:alpine

WORKDIR /usr/app

RUN mkdir -p /usr/app/node_modules && mkdir -p /usr/app/build && mkdir -p /usr/app/public && chown -R node:node /usr/app

COPY --from=build /usr/app/build ./build
COPY --from=build /usr/app/public ./public
COPY --from=build /usr/app/node_modules ./node_modules

RUN chmod -R 777 /usr/app/build

ARG TZ='America/Sao_Paulo'

ENV DEFAULT_TZ ${TZ}

RUN apk upgrade --update \
  && apk add -U tzdata \
  && cp /usr/share/zoneinfo/${DEFAULT_TZ} /etc/localtime \
  && apk del tzdata \
  && rm -rf \
  /var/cache/apk/*

USER node

EXPOSE 2000

CMD ["node", "./build/main.bundle.js"]
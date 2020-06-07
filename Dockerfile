FROM node:alpine

WORKDIR /usr/app
COPY package*.json ./
RUN npm install --silent --progress=false
USER root
COPY . .

RUN npm run build

RUN chown -R node:node ./*

RUN apk update && apk add tzdata &&\ 
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime &&\ 
    echo "America/Sao_Paulo" > /etc/timezone &&\ 
    apk del tzdata && rm -rf /var/cache/apk/*

USER node

EXPOSE 2000

CMD ["node", "./build/main.bundle.js"]
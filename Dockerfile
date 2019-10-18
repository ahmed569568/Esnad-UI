## Stage 1
#FROM node:latest as node
#LABEL author="Kareem Arafa"
#WORKDIR /app
#COPY package.json package.json
#RUN npm install
#COPY . .
#RUN npm run build
#
#
## Stage 2
#FROM nginx:alpine
#VOLUME /var/cache/nginx
#COPY --from=node /app/dist /usr/share/ngix/html
#COPY .config/nginx.conf /etc/nginx/conf.d/default.conf
#
## docker build -t peep-fe -f nginx.prod.dockerfile .
## docker run -p 8080:80 peep-fe


FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/

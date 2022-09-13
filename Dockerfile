FROM node:16.0.0-slim as build-stage

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN yarn install && yarn cache clean

RUN yarn build

RUN npm install -g serve

EXPOSE 3000

CMD serve -s build

# FROM httpd:2.4 as production-stage

# COPY --from=build-stage /app/build /usr/local/apache2/htdocs/

# EXPOSE 80

# CMD ["httpd-foreground"]
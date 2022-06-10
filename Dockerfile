FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY nodejs_files/. /app
RUN yarn install --production
CMD ["node", "index.js"]
EXPOSE 3000

FROM node:18-alpine
WORKDIR /
COPY . .
RUN yarn
CMD [ "node", "server.js" ]
EXPOSE 8080

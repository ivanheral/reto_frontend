FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json .
COPY yarn*.json .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
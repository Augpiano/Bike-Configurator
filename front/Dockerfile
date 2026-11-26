FROM node:26 AS build
WORKDIR /app
COPY package*.json /app
COPY front/package.json /app/front/
RUN npm ci --workspace=front --include-workspace-root
COPY front/ /app/front
RUN npm run build --workspace=front

FROM nginx:alpine
COPY --from=build /app/front/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

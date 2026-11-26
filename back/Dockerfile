FROM node:26
WORKDIR /app
COPY package*.json /app/
COPY back/package.json /app/back/
RUN npm ci --workspace=back --include-workspace-root
COPY back /app/back
RUN npm run build --workspace=back
CMD [ "npm", "start", "--workspace=back"]
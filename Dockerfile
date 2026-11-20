# Build the static site, then serve it with nginx.
# Traefik routes /tools/* to this container WITHOUT stripping the path, so
# the built files live under /usr/share/nginx/html/tools: a request for
# /tools/ resolves to tools/index.html, /tools/sitemap.xml to
# tools/sitemap.xml. Nothing is served at the container root.
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/tools
EXPOSE 80

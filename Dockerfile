#stage1
FROM node:latest as node
WORKDIR /app
COPY .. /app
RUN npm install
RUN npm run build --prod

#stage2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/covidflag /usr/share/nginx/html



#CMD ["nginx", "-g", "daemon off;"]
FROM node:18-alpine AS random_cocktails_build_stage

# install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# copy all local files into the image.
COPY . .

# build app
RUN npm run build

# serve APP
FROM nginx:stable-alpine as random_cocktails_production_stage
COPY --from=random_cocktails_build_stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

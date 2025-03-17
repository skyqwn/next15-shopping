# FROM node:18-alpine AS builder
# WORKDIR /app
# COPY package.json pnpm-lock.yaml ./
# RUN npm install -g pnpm && pnpm install
# COPY . .
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# RUN echo "Build-time NEXT_PUBLIC_API_URL: $NEXT_PUBLIC_API_URL" 
# RUN pnpm run build
# RUN pnpm run export


# FROM nginx:alpine
# COPY --from=builder /app/.next /usr/share/nginx/html/.next
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 3000
# CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "start"]
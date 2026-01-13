# ============================================
# Stage 1: Build Stage
# ============================================
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


# ============================================
# Stage 2: Production Stage
# ============================================
FROM nginx:alpine AS production

# Copy built React app
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config as TEMPLATE (will be substituted at runtime)
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copy entrypoint script with a unique name
COPY docker-entrypoint.sh /usr/local/bin/custom-entrypoint.sh
RUN chmod +x /usr/local/bin/custom-entrypoint.sh

EXPOSE 80

# Use our custom entrypoint
ENTRYPOINT ["/usr/local/bin/custom-entrypoint.sh"]

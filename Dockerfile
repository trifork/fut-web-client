
# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14-buster AS compile-image

WORKDIR /app
 
COPY client/package*.json /app/
RUN npm install

COPY client/ /app/

RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginxinc/nginx-unprivileged:1.19-alpine

COPY --from=compile-image /app/dist/client /www

# Copy the default nginx.conf 
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# API locations. Without traling slashes
ENV CAREPLAN_API https://careplan.fut.trifork.com
ENV PATIENT_API https://patient.fut.trifork.com
ENV ORGANIZATION_API https://organization.fut.trifork.com
ENV TASK_API https://task.fut.trifork.com

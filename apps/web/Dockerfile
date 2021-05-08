FROM node:16
RUN mkdir -p /opt/web
WORKDIR /opt/web
COPY ./ ./
RUN yarn
ENTRYPOINT yarn run build
CMD yarn run start:prod

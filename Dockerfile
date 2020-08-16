FROM nginx:alpine

RUN apk add --no-cache bash

COPY tools/docker/env-setup.sh /usr/local/bin/env-setup.sh
RUN chmod a+x /usr/local/bin/env-setup.sh

COPY tools/docker/nginx.conf /etc/nginx/nginx.conf

COPY build /usr/share/nginx/html
COPY version-info.json /usr/share/nginx/html

COPY .env.* /usr/share/nginx/html/

WORKDIR  /usr/share/nginx/html

CMD ["/bin/bash", "-c", "/usr/local/bin/env-setup.sh && nginx -g \"daemon off;\""]

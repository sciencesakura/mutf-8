ARG GROOVY_VERSION=5.0.4


FROM alpine:3.23 AS groovy-install
ARG GROOVY_VERSION

RUN apk update && \
    apk add curl unzip && \
    curl -fsSLO "https://groovy.jfrog.io/artifactory/dist-release-local/groovy-zips/apache-groovy-binary-$GROOVY_VERSION.zip" && \
    unzip "apache-groovy-binary-$GROOVY_VERSION.zip" -d /groovy


FROM node:24-slim
ARG GROOVY_VERSION
ARG DEBIAN_FRONTEND=noninteractive

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

COPY --from=groovy-install /groovy /usr/local/

RUN apt-get update && \
    apt-get dist-upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends \
      git \
      openjdk-17-jdk-headless \
      sudo && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    usermod -aG sudo node && \
    echo "node ALL=(ALL:ALL) NOPASSWD:ALL" > /etc/sudoers.d/node && \
    ln -s "/usr/local/groovy-$GROOVY_VERSION/bin/groovy" /usr/local/bin/groovy && \
    ln -s "/usr/local/groovy-$GROOVY_VERSION/bin/groovyc" /usr/local/bin/groovyc && \
    ln -s "/usr/local/groovy-$GROOVY_VERSION/bin/groovydoc" /usr/local/bin/groovydoc && \
    ln -s "/usr/local/groovy-$GROOVY_VERSION/bin/groovysh" /usr/local/bin/groovysh

USER node

FROM node:24

ARG DEBIAN_FRONTEND=noninteractive
ARG GROOVY_VERSION=4.0.27

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

RUN apt-get update && \
    apt-get dist-upgrade -y --no-install-recommends && \
    apt-get install -y --no-install-recommends \
      curl \
      git \
      openjdk-17-jdk-headless \
      sudo \
      unzip \
      zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    usermod -aG sudo node && \
    echo "node ALL=(ALL:ALL) NOPASSWD:ALL" > /etc/sudoers.d/node && \
    curl -fsSLO "https://groovy.jfrog.io/artifactory/dist-release-local/groovy-zips/apache-groovy-binary-$GROOVY_VERSION.zip" && \
    unzip "apache-groovy-binary-$GROOVY_VERSION.zip" -d /usr/local && \
    rm -f "apache-groovy-binary-$GROOVY_VERSION.zip" && \
    ln -s "/usr/local/groovy-$GROOVY_VERSION/bin/groovy" /usr/local/bin/groovy && \
    ln -s "/usr/local/groovy-$GROOVY_VERSION/bin/groovyc" /usr/local/bin/groovyc && \
    ln -s "/usr/local/groovy-$GROOVY_VERSION/bin/groovydoc" /usr/local/bin/groovydoc && \
    ln -s "/usr/local/groovy-$GROOVY_VERSION/bin/groovysh" /usr/local/bin/groovysh

USER node

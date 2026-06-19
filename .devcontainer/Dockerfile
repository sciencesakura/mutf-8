FROM node:24-alpine

ARG USERNAME=node
ARG GROOVY_VERSION=5.0.6

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

RUN apk update \
    && apk add --no-cache \
      bash \
      bash-completion \
      git \
      openjdk21-jdk \
      sudo \
      unzip \
    && sed -i -E "s@^($USERNAME:[^:]*:[^:]*:[^:]*:[^:]*:[^:]*:).+@\1/bin/bash@" /etc/passwd \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" >>/etc/sudoers.d/$USERNAME \
    && wget -q -O apache-groovy-binary.zip "https://groovy.jfrog.io/artifactory/dist-release-local/groovy-zips/apache-groovy-binary-$GROOVY_VERSION.zip" \
    && unzip -o -q apache-groovy-binary.zip -d /opt \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/grape"     /usr/local/bin/ \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovy"    /usr/local/bin/ \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovyc"   /usr/local/bin/ \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovydoc" /usr/local/bin/ \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovysh"  /usr/local/bin/ \
    && npm completion >/usr/share/bash-completion/completions/npm \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/grape_completion"     /usr/share/bash-completion/completions/grape \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovy_completion"    /usr/share/bash-completion/completions/groovy \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovyc_completion"   /usr/share/bash-completion/completions/groovyc \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovydoc_completion" /usr/share/bash-completion/completions/groovydoc \
    && ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovysh_completion"  /usr/share/bash-completion/completions/groovysh \
    && rm apache-groovy-binary.zip

USER $USERNAME

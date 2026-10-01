#!/bin/sh

sudo sed -i -E "s@^($USERNAME:[^:]*:[^:]*:[^:]*:[^:]*:[^:]*:).+@\1/bin/bash@" /etc/passwd

sudo apk update
sudo apk add --no-cache openjdk21-jdk

# https://groovy.apache.org/download.html
GROOVY_VERSION=5.1.3
curl -sL -O "https://groovy.jfrog.io/artifactory/dist-release-local/groovy-zips/apache-groovy-binary-$GROOVY_VERSION.zip"
sudo unzip -o -q "apache-groovy-binary-$GROOVY_VERSION.zip" -d /opt
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/grape"     /usr/local/bin/
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovy"    /usr/local/bin/
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovyc"   /usr/local/bin/
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovydoc" /usr/local/bin/
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovysh"  /usr/local/bin/
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/grape_completion"     /usr/share/bash-completion/completions/grape
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovy_completion"    /usr/share/bash-completion/completions/groovy
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovyc_completion"   /usr/share/bash-completion/completions/groovyc
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovydoc_completion" /usr/share/bash-completion/completions/groovydoc
sudo ln -s "/opt/groovy-$GROOVY_VERSION/bin/groovysh_completion"  /usr/share/bash-completion/completions/groovysh
rm "apache-groovy-binary-$GROOVY_VERSION.zip"

# https://pnpm.io/installation
SHELL=/bin/bash npx -y get-pnpm

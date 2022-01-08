FROM oraclelinux:7-slim

RUN curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
  rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg

RUN yum -y install oracle-release-el7 oracle-nodejs-release-el7 && \
  yum-config-manager --disable ol7_developer_EPEL && \
  yum -y install oracle-instantclient19.3-basiclite nodejs yarn

RUN yarn set version stable

RUN rm -rf /var/cache/yum

CMD /bin/bash
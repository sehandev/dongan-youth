FROM arm64v8/oraclelinux:7


RUN yum -y install oracle-release-el7 oracle-nodejs-release-el7 
RUN yum-config-manager --disable ol7_developer_EPEL
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -
RUN curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
RUN yum -y install nodejs yarn
RUN yum -y install oracle-instantclient19.10-basic oracle-instantclient19.10-sqlplus

RUN yum -y install python3 \
  python3-libs \
  python3-pip \
  python3-setuptools \
  python36-cx_Oracle

RUN yum -y groupinstall "Development Tools" 

RUN rm -rf /var/cache/yum

ENV NODE_PATH=/usr/lib/node_modules
CMD /bin/bash
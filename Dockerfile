FROM tomcat:8.5.43


COPY ais.war /usr/local/tomcat/webapps
COPY tomcat-0.0.1-SNAPSHOT.jar /usr/local/tomcat/lib/tomcat-0.0.1-SNAPSHOT.jar
COPY config/server.xml /usr/local/tomcat/conf/server.xml
COPY ais.xml /usr/local/tomcat/conf/Catalina/localhost/ais.xml
COPY ais.jks /usr/local/tomcat/ssl/ais.jks



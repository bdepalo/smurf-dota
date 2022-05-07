FROM openjdk:11-jdk-slim
COPY rest-api/build/libs/rest-api.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
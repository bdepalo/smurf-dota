FROM openjdk:11-jdk-slim
COPY rest-api/ rest-api
ENTRYPOINT ["./rest-api/gradlew","rest-api:bootRun"]
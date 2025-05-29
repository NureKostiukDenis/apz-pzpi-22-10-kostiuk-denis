FROM eclipse-temurin:21-jdk

WORKDIR /app
COPY build/libs/*.jar app.jar
COPY anware-firebase-adminsdk.json ./
COPY application.properties ./

EXPOSE 8002
ENTRYPOINT ["java", "-jar", "app.jar"]

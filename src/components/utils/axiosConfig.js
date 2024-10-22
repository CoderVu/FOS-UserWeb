import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://pbl6-fastordersystem.onrender.com',
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('configg', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
// # Stage 1: build
// # Start with a Maven image that includes JDK 21
// FROM maven:3.9.8-amazoncorretto-21 AS build

// # Copy source code and pom.xml file to /app folder
// WORKDIR /app
// COPY pom.xml .
// COPY src ./src

// # Build source code with maven
// RUN mvn package -DskipTests

// #Stage 2: create image
// # Start with Amazon Correto JDK 21
// FROM amazoncorretto:21.0.4

// # Set working folder to App and copy complied file from above step
// WORKDIR /app
// COPY --from=build /app/target/*.jar app.jar
// # Command to run the application
// ENTRYPOINT ["java", "-jar", "app.jar"]
plugins {
    id("org.springframework.boot") version "2.6.7"
    id("io.spring.dependency-management") version "1.0.11.RELEASE"
}

dependencies {

    implementation("org.springframework.boot:spring-boot-starter-web")
    testImplementation("org.springframework.boot:spring-boot-starter-test")

    implementation("com.fasterxml.jackson.core:jackson-databind:2.13.2.2")
    implementation("org.jsoup:jsoup:1.14.3")
    runtimeOnly("org.postgresql:postgresql:42.3.5")

}

tasks.getByName<Test>("test") {
    useJUnitPlatform()
}
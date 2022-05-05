plugins {
    id("java")
}

group = "org.threetwotwo"
version = "1.0-SNAPSHOT"

allprojects {
    repositories {
        mavenCentral()
    }
}

subprojects {
    apply(plugin = "java")

    dependencies {
        testImplementation("org.junit.jupiter:junit-jupiter-api:5.8.1")
        testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.8.1")

        configurations.all {
            exclude("junit", "junit")
        }
    }

    tasks.getByName<Test>("test") {
        useJUnitPlatform()
    }
}

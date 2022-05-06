plugins {
    id("java")
    id("application")
}

dependencies {
    implementation("com.fasterxml.jackson.core:jackson-databind:2.13.2.2")
    implementation("org.apache.commons:commons-lang3:3.12.0")
    implementation("org.jsoup:jsoup:1.14.3")
}

application {
    mainClass.set("org.threetwotwo.scraper.item.ItemCostScraper")
}

tasks.getByName<Test>("test") {
    useJUnitPlatform()
}
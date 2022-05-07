plugins {
    id("application")
}

dependencies {
    implementation("com.fasterxml.jackson.core:jackson-databind:2.13.2.2")
    implementation("org.jsoup:jsoup:1.14.3")
    runtimeOnly("org.postgresql:postgresql:42.3.5")

}

application {
    mainClass.set("org.threetwotwo.scraper.item.ItemCostScraper")
}

tasks.getByName<Test>("test") {
    useJUnitPlatform()
}
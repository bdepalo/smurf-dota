package org.threetwotwo.rest;

import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class SmurfRestController {

    private final static String URL = "jdbc:postgresql://192.168.1.5:5432/postgres";
    private final static String USER = "postgres";
    private final static String PW = "docker";

    private static final List<String> CONSUMABLES = List.of("clarity", "sentry_ward", "smoke_of_deceit",
            "dust_of_appearance", "enchanted_mango", "faerie_fire", "tango", "healing_salve");
    private static final List<String> NORMAL_EXCLUSIONS = List.of("sentry_ward", "smoke_of_deceit", "dust_of_appearance");

    @GetMapping("/random")
    public Map<String, Integer> getRandomStartingBuild() {

        // build query
        String query = "SELECT * FROM starting_builds ORDER BY random() LIMIT 1";

        // query database
        return queryDatabase(query);
    }

    @GetMapping("/random/normal")
    public Map<String, Integer> getRandomStartingBuildGeneral() {
        return getRandomStartingBuildExcludingItems(NORMAL_EXCLUSIONS);
    }

    @GetMapping("/random/no-consumables")
    public Map<String, Integer> getRandomStartingBuildNoConsumables() {
        return getRandomStartingBuildExcludingItems(CONSUMABLES);
    }

    @GetMapping("/random/excluding")
    public Map<String, Integer> getRandomStartingBuildExcludingItems(
            @RequestParam List<String> excludedItems
    ) {

        // build map of excluded items with cap of 0
        HashMap<String, Integer> exclusions = new HashMap<>();
        excludedItems.forEach(item -> exclusions.put(item, 0));

        return getRandomStartingBuildWithItemCaps(exclusions);
    }

    @PostMapping("/random/with-cap")
    public Map<String, Integer> getRandomStartingBuildWithItemCaps(
            @RequestBody Map<String, Integer> itemCaps
    ) {

        // no item caps were provided
        if (itemCaps.isEmpty())
            return getRandomStartingBuild();

        // build where clause
        String where = itemCaps.entrySet().stream().map(
                entry -> entry.getKey() + " <= " + entry.getValue()
        ).collect(Collectors.joining(" AND "));

        // build full query
        String query = "SELECT * FROM starting_builds WHERE " + where + " ORDER BY random() LIMIT 1";

        // query database
        return queryDatabase(query);
    }

    private Map<String, Integer> queryDatabase(String query) {

        HashMap<String, Integer> build = new HashMap<>();

        try {
            Connection connection = DriverManager.getConnection(URL, USER, PW);

            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery(query);
            ResultSetMetaData metaData = rs.getMetaData();

            rs.next();
            for (int i = 1; i <= metaData.getColumnCount(); i++) {
                String itemName = metaData.getColumnName(i);
                int itemCount = rs.getInt(i);
                if (itemCount > 0)
                    build.put(itemName, itemCount);
            }

            statement.close();
            connection.close();


        } catch (SQLException e) {
            throw new RuntimeException("Error when querying the database", e);
        }

        return build;
    }
}

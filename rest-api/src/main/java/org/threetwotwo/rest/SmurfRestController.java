package org.threetwotwo.rest;

import org.springframework.web.bind.annotation.*;

import java.sql.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
public class SmurfRestController extends AbstractSmurfController {

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
        HashMap<String, List<Integer>> exclusions = new HashMap<>();
        excludedItems.forEach(item -> exclusions.put(item, List.of(0, 0)));

        return getRandomStartingBuildWithItemCaps(exclusions);
    }

    @PostMapping("/random/with-cap")
    public Map<String, Integer> getRandomStartingBuildWithItemCaps(
            @RequestBody Map<String, List<Integer>> itemCaps
    ) {

        // no item caps were provided
        if (itemCaps.isEmpty())
            return getRandomStartingBuild();

        // build where clause
        String where = itemCaps.entrySet().stream().map(
                entry -> entry.getKey() + " >= " + entry.getValue().get(0) + " AND " + entry.getKey() + " <= " + entry.getValue().get(1)
        ).collect(Collectors.joining(" AND "));

        // build full query
        String query = "SELECT * FROM starting_builds WHERE " + where + " ORDER BY random() LIMIT 1";

        // query database
        return queryDatabase(query);
    }
}

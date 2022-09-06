package org.threetwotwo.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class ItemController extends AbstractSmurfController {

    @GetMapping("/item-names")
    public List<String> getItemNames() {

        return queryDatabaseList("SELECT name FROM items WHERE cost <= 600 AND cost > 0 AND name NOT IN " +
                "('Tome_of_Knowledge','Town_Portal_Scroll','Infused_Raindrops')");
    }
}

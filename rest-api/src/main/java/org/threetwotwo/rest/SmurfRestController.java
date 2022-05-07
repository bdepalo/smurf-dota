package org.threetwotwo.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;
import java.util.HashMap;
import java.util.Map;

@RestController
public class SmurfRestController {

    @GetMapping("/random")
    public Map<String, Integer> getRandomStartingBuild() {

        HashMap<String,Integer> randomBuild = new HashMap<>();

        try {

            String url = "jdbc:postgresql://192.168.1.5:5432/postgres";
            String user = "postgres";
            String password = "docker";
            Connection connection = DriverManager.getConnection(url, user, password);

            String SQL = "SELECT * FROM starting_builds ORDER BY random() LIMIT 1";
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery(SQL);
            ResultSetMetaData metaData = rs.getMetaData();

            rs.next();
            for (int i = 1; i <= metaData.getColumnCount(); i++) {
                String itemName = metaData.getColumnName(i);
                int itemCount = rs.getInt(i);
                if (itemCount > 0)
                    randomBuild.put(itemName,itemCount);
            }

            statement.close();
            connection.close();


        } catch (SQLException e) {
            throw new RuntimeException("Error when querying the database", e);
        }

        return randomBuild;
    }
}

package org.threetwotwo.rest;

import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;

public abstract class AbstractSmurfController {

    private final static String URL = "jdbc:postgresql://192.168.1.5:5432/postgres";
    private final static String USER = "postgres";
    private final static String PW = "docker";

    public Map<String, Integer> queryDatabase(String query) {

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

    public List<String> queryDatabaseList(String query) {

        try {
            Connection connection = DriverManager.getConnection(URL, USER, PW);

            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery(query);

            String[] array = (String[]) rs.getArray(0).getArray();

            statement.close();
            connection.close();

            return List.of(array);
        } catch (SQLException e) {
            throw new RuntimeException("Error when querying the database", e);
        }
    }
}

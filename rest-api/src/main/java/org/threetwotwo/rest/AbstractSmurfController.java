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

    public List<Item> queryDatabaseList(String query) {

        try {
            Connection connection = DriverManager.getConnection(URL, USER, PW);

            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery(query);

            ArrayList<Item> itemNames = new ArrayList<>();
            while(rs.next()){
                try {
                    itemNames.add(createItem(rs));
                }catch (SQLException e){
                    System.err.println(e);
                }
            }

            statement.close();
            connection.close();

            return itemNames;
        } catch (SQLException e) {
            throw new RuntimeException("Error when querying the database", e);
        }
    }

    protected class Item{
        private final String name;
        private final int cost;
        private final String image;
        private final String link;

        public Item(String name, int cost, String image, String link) {
            this.name = name;
            this.cost = cost;
            this.image = image;
            this.link = link;
        }

        public String getName() {
            return name;
        }

        public int getCost() {
            return cost;
        }

        public String getImage() {
            return image;
        }

        public String getLink() {
            return link;
        }
    }

    private Item createItem(ResultSet rs) throws SQLException{
        return new Item(
          rs.getString("name"),
          rs.getInt("cost"),
          rs.getString("image"),
          rs.getString("link")
        );
    }
}

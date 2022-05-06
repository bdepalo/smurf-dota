package org.threetwotwo.scraper.item;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class ItemCostScraper {


    public static void main(String[] args) {

        try {

            Document doc = Jsoup.connect("https://dota2.fandom.com/wiki/Items").get();

            Elements consumables = doc.select("h3:contains(Consumables) + div.itemlist");
            Elements attributes = doc.select("h3:contains(Attributes) + div.itemlist");
            Elements equipment = doc.select("h3:contains(Equipment) + div.itemlist");
            Elements misc = doc.select("h3:contains(Miscellaneous) + div.itemlist");
            Elements secret = doc.select("h3:contains(Secret) + div.itemlist");
            Elements accessories = doc.select("h3:contains(Accessories) + div.itemlist");
            Elements support = doc.select("h3:contains(Support) + div.itemlist");
            Elements magical = doc.select("h3:contains(Magical) + div.itemlist");
            Elements armor = doc.select("h3:contains(Armor) + div.itemlist");
            Elements weapons = doc.select("h3:contains(Weapons) + div.itemlist");
            Elements artifacts = doc.select("h3:contains(Artifacts) + div.itemlist");

            ArrayList<Element> allElements = new ArrayList<>();
            allElements.addAll(consumables);
            allElements.addAll(attributes);
            allElements.addAll(equipment);
            allElements.addAll(secret);
            allElements.addAll(accessories);
            allElements.addAll(support);
            allElements.addAll(magical);
            allElements.addAll(armor);
            allElements.addAll(weapons);
            allElements.addAll(misc);
            allElements.addAll(artifacts);

            List<DotaItem> allItems = allElements.stream().flatMap(element -> element.children().select("div").stream().map(item -> {
                Element firstLink = item.select("a").first();
                if (firstLink != null) {
                    String link = firstLink.attr("href");
                    String nameCost = firstLink.attr("title");
                    String name = StringUtils.substringBetween(nameCost, "", " (");
                    String cost = StringUtils.substringBetween(nameCost, "(", ")");
                    String imgLink = firstLink.select("img").attr("data-src");
                    return new DotaItem().setCost(Integer.parseInt(cost)).setImageLink(imgLink).setName(name).setItemPageLink(link);
                }
                return null;

            })).collect(Collectors.toList());

            // filter out items with 0 cost and > 600 cost
            allItems = allItems.stream().filter(x -> x.getCost() <= 600 && x.getCost() > 0).collect(Collectors.toList());

            // do the thing
            List<HashMap<DotaItem, AtomicInteger>> db = from(new HashMap<>(), allItems).stream().distinct().collect(Collectors.toList());

            // output
            FileWriter writer = new FileWriter("db.csv");
            String topRow = allItems.stream().map(DotaItem::getName).collect(Collectors.joining(","));
            writer.write(topRow);

            for (HashMap<DotaItem, AtomicInteger> build : db) {
                String line = allItems.stream().map(item -> build.getOrDefault(item, new AtomicInteger(0)).toString()).collect(Collectors.joining(","));
                writer.write(line + "\n");
            }

            writer.close();

            System.out.println(topRow);
            System.out.println(allItems.stream().map(item -> db.get((int) Math.floor(Math.random()*db.size())).getOrDefault(item, new AtomicInteger(0)).toString()).collect(Collectors.joining(",")));
            System.out.println(allItems.stream().map(item -> db.get((int) Math.floor(Math.random()*db.size())).getOrDefault(item, new AtomicInteger(0)).toString()).collect(Collectors.joining(",")));
            System.out.println(allItems.stream().map(item -> db.get((int) Math.floor(Math.random()*db.size())).getOrDefault(item, new AtomicInteger(0)).toString()).collect(Collectors.joining(",")));

        } catch (IOException e) {
            System.out.println("FAILURE");
            e.printStackTrace();
            System.exit(-1);
        }

        System.exit(0);
    }

    public static List<HashMap<DotaItem, AtomicInteger>> from(HashMap<DotaItem, AtomicInteger> build, List<DotaItem> items) {
        List<HashMap<DotaItem, AtomicInteger>> builds = new ArrayList<>();

        // get current cost of build
        int currentCost = build.entrySet().stream().mapToInt(itemCountEntry -> itemCountEntry.getValue().intValue() * itemCountEntry.getKey().getCost()).sum();

        if(currentCost > 600)
            return builds;

        // attempt to add an item to the build
        for (DotaItem item : items) {

            // item is able to be added to build
            if (item.getCost() + currentCost <= 600) {

                HashMap<DotaItem, AtomicInteger> subBuild = new HashMap<>(build);
                if (subBuild.containsKey(item))
                    subBuild.get(item).getAndIncrement();
                subBuild.putIfAbsent(item, new AtomicInteger(1));
                builds.addAll(from(subBuild, items));
            }else{
                builds.add(build);
            }
        }
        return builds;
    }

}

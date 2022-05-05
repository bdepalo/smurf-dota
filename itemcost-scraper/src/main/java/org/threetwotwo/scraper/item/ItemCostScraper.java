package org.threetwotwo.scraper.item;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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

            System.out.println("Possible Starting Items");
            allItems.stream().filter(x -> x.getCost() < 600).forEach(System.out::println);
            System.out.println();
            System.out.println();
            System.out.println("All Items");
            allItems.forEach(System.out::println);

        } catch (IOException e) {
            System.out.println("FAILURE");
            e.printStackTrace();
            System.exit(-1);
        }

        System.exit(0);
    }
}

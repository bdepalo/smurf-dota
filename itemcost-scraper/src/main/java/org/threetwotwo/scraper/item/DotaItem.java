package org.threetwotwo.scraper.item;

import java.util.List;

public class DotaItem {

    private String name;
    private int cost;
    private List<DotaItem> components;
    private List<DotaItem> buildsInto;
    private String imageLink;
    private String itemPageLink;

    public DotaItem setName(String name) {
        this.name = name;
        return this;
    }

    public DotaItem setCost(int cost) {
        this.cost = cost;
        return this;
    }

    public DotaItem setComponents(List<DotaItem> components) {
        this.components = components;
        return this;
    }

    public DotaItem setBuildsInto(List<DotaItem> buildsInto) {
        this.buildsInto = buildsInto;
        return this;
    }

    public DotaItem setImageLink(String imageLink) {
        this.imageLink = imageLink;
        return this;
    }

    public DotaItem setItemPageLink(String itemPageLink) {
        this.itemPageLink = itemPageLink;
        return this;
    }

    public String getName() {
        return name;
    }

    public int getCost() {
        return cost;
    }

    public List<DotaItem> getComponents() {
        return components;
    }

    public List<DotaItem> getBuildsInto() {
        return buildsInto;
    }

    public String getImageLink() {
        return imageLink;
    }

    public String getItemPageLink() {
        return itemPageLink;
    }

    @Override
    public String toString() {
        return "DotaItem{" +
                "name='" + name + '\'' +
                ", cost=" + cost +
                ", components=" + components +
                ", buildsInto=" + buildsInto +
                ", imageLink='" + imageLink + '\'' +
                ", itemPageLink='" + itemPageLink + '\'' +
                '}';
    }
}

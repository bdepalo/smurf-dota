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

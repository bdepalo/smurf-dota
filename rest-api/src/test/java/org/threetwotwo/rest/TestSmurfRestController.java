package org.threetwotwo.rest;

import org.junit.jupiter.api.Test;

import java.util.Map;

public class TestSmurfRestController {

    @Test
    public void gitDotGud(){
        SmurfRestController controller = new SmurfRestController();
        System.out.println(controller.getRandomStartingBuildWithItemCaps(Map.of("clarity", 0)));
    }
}

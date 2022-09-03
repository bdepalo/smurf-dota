package org.threetwotwo.rest;


import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

public class TestSmurfRestController {

    @Test
    @Disabled
    public void testNoClarity(){
        SmurfRestController controller = new SmurfRestController();
        System.out.println(controller.getRandomStartingBuildWithItemCaps(Map.of("clarity", List.of(0,0))));
    }
}

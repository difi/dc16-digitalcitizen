package digitalcitizen.controllers;

/**
 * Created by camp-vhe on 18.07.2016.
 */

import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;

@RestController
public class MunicipalityController {

    @CrossOrigin
    @RequestMapping(value = "/api/municipality", params = "pnr", method = RequestMethod.GET, produces = "text/plain")
    @ResponseBody
    public String getMunicipalityByPnr(@RequestParam("pnr") String pnr) {

        String s = (TestData.PERSONS).stream().filter(p -> p.getPnr().equals(pnr)).map(p -> p.getAddress().getMunicipality()).findFirst().get();
        System.out.println(s);
        return s;
    }
}

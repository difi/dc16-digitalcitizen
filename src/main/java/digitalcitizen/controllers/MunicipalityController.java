package digitalcitizen.controllers;

import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

@RestController
public class MunicipalityController {

    /**
     * Handles requests made to "/api/municipality". Used for retrieving the municipality of a person.
     * The request requires a "pnr" argument.
     *
     * @return boolean
     */
    @CrossOrigin
    @RequestMapping(value = "/api/municipality", params = "pnr", method = RequestMethod.GET, produces = "text/plain")
    @ResponseBody
    public String getMunicipalityByPnr(@RequestParam("pnr") String pnr) {
        return (TestData.PERSONS).stream().filter(p -> p.getPnr().equals(pnr)).map(p -> p.getAddress().getMunicipality()).findFirst().get();

    }
}

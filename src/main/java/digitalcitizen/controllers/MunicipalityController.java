package digitalcitizen.controllers;

import digitalcitizen.Application;
import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class MunicipalityController {

    // TODO: Remove pnr parameter (only used for testing) use request.getHeader("X-DifiProxy-pid") instead.

    /**
     * Handles requests made to "/api/municipality". Used for retrieving the municipality of a person.
     * The request requires a "pnr" argument for testing.
     *
     * @return boolean
     */
    @CrossOrigin
    @RequestMapping(value = "/api/municipality", params = "pnr", method = RequestMethod.GET, produces = "text/plain")
    @ResponseBody
    public String getMunicipalityByPnr(@RequestParam("pnr") String pnr, HttpServletRequest request) {

        String pnr2 = Application.IS_USING_PROXY ? request.getHeader("X-DifiProxy-pid") : pnr;
        return (TestData.PERSONS).stream().filter(p -> p.getPnr().equals(pnr2)).map(p -> p.getAddress().getMunicipality()).findFirst().get();
    }
}

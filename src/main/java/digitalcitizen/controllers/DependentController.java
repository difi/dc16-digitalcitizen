package digitalcitizen.controllers;

import digitalcitizen.Application;
import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class DependentController {

    // TODO: Remove pnr parameter (only used for testing) use request.getHeader("X-DifiProxy-pid") instead.

    @CrossOrigin
    @RequestMapping(value = "/api/dependent", params = "pnr", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Person getPersonasDependent(@RequestParam("pnr") String pnr, HttpServletRequest request) {

        String pnr2 = Application.IS_USING_PROXY ? request.getHeader("X-DifiProxy-pid") : pnr;
        return TestData.PERSONS.stream().filter(p -> p.getPnr().equals(pnr2)).findFirst().get();
    }
}

package digitalcitizen.controllers;

import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

@RestController
public class DependentController {

    @CrossOrigin
    @RequestMapping(value = "/api/dependent", params = "pnr", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Person getPersonasDependent(@RequestParam("pnr") String pnr) {
        return TestData.PERSONS.stream().filter(p -> p.getPnr().equals(pnr)).findFirst().get();
    }
}

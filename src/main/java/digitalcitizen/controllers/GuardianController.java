package digitalcitizen.controllers;

import digitalcitizen.models.Guardian;
import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
public class GuardianController {

    @CrossOrigin
    @RequestMapping(value = "/api/guardians", params = "pnr", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Collection<Person> getGuardiansByLocation(@RequestParam("pnr") String pnr) {
        return TestData.GUARDIANS.stream().filter(guardian -> guardian.getPNR().equals(pnr)).map(Guardian::getGuardianFor).findFirst().get();
    }
}

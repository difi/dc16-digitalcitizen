package digitalcitizen.controllers;

import digitalcitizen.Application;
import digitalcitizen.models.Guardian;
import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;

@RestController
public class GuardianController {

    // TODO: Remove pnr parameter (only used for testing) use request.getHeader("X-DifiProxy-pid") instead.

    @CrossOrigin
    @RequestMapping(value = "/api/guardians", params = "pnr", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Collection<Person> getGuardiansByPnr(@RequestParam("pnr") String pnr, HttpServletRequest request) {

        String pnr2 = Application.IS_USING_PROXY ? request.getHeader("X-DifiProxy-pid") : pnr;
        return TestData.GUARDIANS.stream().filter(guardian -> guardian.getPnr().equals(pnr2)).map(Guardian::getGuardianFor).findFirst().get();
    }
}

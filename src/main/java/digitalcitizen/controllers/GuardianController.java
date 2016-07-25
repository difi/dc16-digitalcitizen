package digitalcitizen.controllers;

/**
 * Created by camp-vhe on 08.07.2016.
 */

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
        return TestData.GUARDIANS.stream().filter(guardian -> guardian.getPNR().equals(pnr)).map(guardian -> guardian.getGuardianFor()).findFirst().get();
        /*Collection<Person> retrievedGuardians = new ArrayList<>();

        for(Guardian guardian : TestData.GUARDIANS){
            if(guardian.getPNR().equals(pnr)){
                retrievedGuardians = guardian.getGuardianFor();
            }
        }

        return retrievedGuardians;*/
    }
}

package digitalcitizen.controllers;

/**
 * Created by camp-vhe on 08.07.2016.
 */
import digitalcitizen.models.Guardian;
import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class GuardianController {

    @CrossOrigin
    @RequestMapping(value = "/api/guardians", params = "pnr", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Collection<Person> getGuardiansByLocation(@RequestParam("pnr") String pnr) {
        //Collection<> test = TestData.GUARDIANS.stream().filter(guardian->guardian.getPNR().equals(pnr)).findFirst().map(guardian-> guardian.getGuardianFor()).collect(Collectors.toList());
        Collection<Person> retrievedGuardians = new ArrayList<>();

        for(Guardian guardian : TestData.GUARDIANS){
            if(guardian.getPNR().equals(pnr)){
                retrievedGuardians = guardian.getGuardianFor();
            }
        }

        return retrievedGuardians;
    }
}

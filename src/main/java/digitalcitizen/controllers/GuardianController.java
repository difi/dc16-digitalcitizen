package digitalcitizen.controllers;

/**
 * Created by camp-vhe on 08.07.2016.
 */
import digitalcitizen.models.Guardian;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;

@RestController
public class GuardianController {

    @CrossOrigin
    @RequestMapping(value = "/api/Guardians", params = "loc", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public ArrayList<String> getGuardiansByLocation(@RequestParam("loc") String loc) {
        // TODO: Implement more efficient search
        ArrayList<String> retrievedGuardians = new ArrayList<>();

        for(Guardian guardian : TestData.GUARDIANS){
            if(guardian.getPNR().equals(loc)){
                retrievedGuardians = new ArrayList<>(Arrays.asList(guardian.getGuardianFor()));
            }
        }

        return retrievedGuardians;
    }
}

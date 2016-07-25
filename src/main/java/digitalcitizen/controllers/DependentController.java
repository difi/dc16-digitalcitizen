package digitalcitizen.controllers;

/**
 * Created by camp-vhe on 08.07.2016.
 */

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
        /*Person retrievedPerson = new Person();
        for(Person p : TestData.PERSONS){
            if(p.getPnr().equals(pnr)){
                retrievedPerson = p;
            }
        }
        return retrievedPerson;*/
    }
}

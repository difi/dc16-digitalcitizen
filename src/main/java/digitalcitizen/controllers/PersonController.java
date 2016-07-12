/*Created by camp-cha on 12.07.2016.*/

package digitalcitizen.controllers;

import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;


@RestController
public class PersonController {

    @CrossOrigin
    @RequestMapping(value = "/api/person", params = "pnr", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Person gerPersonByPnr(@RequestParam("pnr") String pnr) {

        return TestData.PERSONS.stream().filter(p -> p.getPnr().equals(pnr)).findFirst().get();
    }
}
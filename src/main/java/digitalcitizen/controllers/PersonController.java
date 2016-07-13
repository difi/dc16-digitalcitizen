/*Created by camp-cha on 12.07.2016.*/

package digitalcitizen.controllers;

import java.lang.String;
import java.util.ArrayList;

import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;


@RestController
public class PersonController {

    @CrossOrigin
    @RequestMapping(value = "/api/person", params = {"pnr", "name"}, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Boolean gerPersonByPnr(@RequestParam("pnr") String pnr, @RequestParam("name") String name) {
        for (Person person : TestData.PERSONS) {
            if (person.getPnr().equals(pnr) && person.getName().equals(name)) {
                return true;
            }
        }
        return false;
    }
}
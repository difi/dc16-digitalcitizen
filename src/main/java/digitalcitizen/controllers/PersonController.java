/*Created by camp-cha on 12.07.2016.*/

package digitalcitizen.controllers;

import java.lang.String;
import java.util.ArrayList;
import java.util.stream.Collectors;

import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;


@RestController
public class PersonController {

    @CrossOrigin
    @RequestMapping(value = "/api/person", params = {"pnr", "name"}, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Boolean gerPersonByPnr(@RequestParam("pnr") String pnr, @RequestParam("name") String name) {
        return TestData.PERSONS.stream().filter(p-> p.getPnr().equals(pnr) && p.getName().equals(name)).collect(Collectors.toList()).size()>0;
        /*for (Person person : TestData.PERSONS) {
            if (person.getPnr().equals(pnr) && person.getName().equals(name)) {
                return true;
            }
        }
        return false;*/
    }
}
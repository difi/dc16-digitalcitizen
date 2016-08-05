package digitalcitizen.controllers;

import digitalcitizen.Application;
import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.stream.Collectors;


@RestController
public class PersonController {

    /**
     * Handles requests made to "/api/person". Used for verifying that a name and pnr match.
     * The request requires "name" and "pnr" arguments.
     *
     * @return boolean
     */
    @CrossOrigin
    @RequestMapping(value = "/api/person", params = {"pnr", "name"}, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Boolean gerPersonByPnr(@RequestParam("pnr") String pnr, @RequestParam("name") String name) {
        return TestData.PERSONS.stream().filter(p -> p.getPnr().equals(pnr) && p.getName().equals(name)).collect(Collectors.toList()).size() > 0;
    }
}
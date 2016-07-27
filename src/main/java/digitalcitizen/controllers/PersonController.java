package digitalcitizen.controllers;

import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;


@RestController
public class PersonController {

    @CrossOrigin
    @RequestMapping(value = "/api/person", params = {"pnr", "name"}, method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Boolean gerPersonByPnr(@RequestParam("pnr") String pnr, @RequestParam("name") String name) {
        return TestData.PERSONS.stream().filter(p -> p.getPnr().equals(pnr) && p.getName().equals(name)).collect(Collectors.toList()).size() > 0;
    }
}
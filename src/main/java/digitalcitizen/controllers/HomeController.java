package digitalcitizen.controllers;


import digitalcitizen.models.Nursing_Home;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class HomeController {

    @CrossOrigin
    @RequestMapping(value = "/api/homes", params = "mun", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Nursing_Home> getDoctorsByLocation(@RequestParam("mun") String mun) {

        return (TestData.HOMES).stream().filter(home -> home.getMunicipality().equals(mun)).collect(Collectors.toList());
    }
}

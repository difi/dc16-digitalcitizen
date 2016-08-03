package digitalcitizen.controllers;

import digitalcitizen.models.NursingHome;
import digitalcitizen.utilities.TestData;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class HomeController {

    @CrossOrigin
    @RequestMapping(value = "/api/homes", params = "mun", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<NursingHome> getNursingHomesByLocation(@RequestParam("mun") String mun) {
        return (TestData.HOMES).stream().filter(home -> home.getMunicipality().equals(mun)).collect(Collectors.toList());
    }
}

package digitalcitizen.controllers;

import digitalcitizen.models.Doctor;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class DoctorController {

    /**
     * Handles requests made to "/api/doctors". The method returns a list of all the {@link Doctor} located
     * at a given location (municipality). The request requires a "loc" paramter.
     *
     * @return A list of {@link Doctor} in JSON format.
     */
    @CrossOrigin
    @RequestMapping(value = "/api/doctors", params = "loc", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Doctor> getDoctorsByLocation(@RequestParam("loc") String loc) {
        return (TestData.DOCTORS).stream().filter(doc -> doc.getLocation().equals(loc)).collect(Collectors.toList());
    }
}

package digitalcitizen.controllers;


import digitalcitizen.models.Doctor;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class DoctorController {

    @CrossOrigin
    @RequestMapping(value = "/api/doctors", params = "loc", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public List<Doctor> getDoctorsByLocation(@RequestParam("loc") String loc) {

        return (TestData.DOCTORS).stream().filter(doc->doc.getLocation().equals(loc)).collect(Collectors.toList());
        /*ArrayList<Doctor> retrievedDoctors = new ArrayList<>();
        for(Doctor doc : TestData.DOCTORS){
            if(doc.getLocation().equals(loc)){
                retrievedDoctors.add(doc);
            }
        }
        return retrievedDoctors;*/
    }
}

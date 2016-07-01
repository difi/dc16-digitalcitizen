package digitalcitizen.controllers;


import digitalcitizen.models.Doctor;
import digitalcitizen.utilities.TestData;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class DoctorController {

    @RequestMapping(value = "/api/doctors", params = "loc", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public ArrayList<Doctor> getDoctorsByLocation(@RequestParam("loc") String loc) {
        // TODO: Implement more efficient search
        ArrayList<Doctor> retrievedDoctors = new ArrayList<>();
        for(Doctor doc : TestData.DOCTORS){
            if(doc.getLocation().equals(loc)){
                retrievedDoctors.add(doc);
            }
        }
        return retrievedDoctors;
    }
}

package digitalcitizen.controllers;



import digitalcitizen.models.Submission;
import org.springframework.web.bind.annotation.*;

@RestController
public class SubmitController {


    @RequestMapping(value="/send", method = RequestMethod.POST)
    public @ResponseBody
    Submission post(@RequestBody final Submission submission) {

        // TODO: Validate form
        // TODO: Add application to database?
        // TODO: Return a PDF-file to the user?
        System.out.println("Submission received");

        return submission;
    }

}



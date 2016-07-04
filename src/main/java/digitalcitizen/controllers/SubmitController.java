package digitalcitizen.controllers;



import digitalcitizen.models.Submission;
import digitalcitizen.utilities.SubmissionValidator;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
public class SubmitController {


    @RequestMapping(value="/send", method = RequestMethod.POST)
    public @ResponseBody
    Submission post(@RequestBody final Submission submission, HttpServletRequest request) {

        // TODO: Validate form
        // TODO: Add application to database?
        // TODO: Return a PDF-file to the user?

        printSubmissionRequest(submission, request);
        boolean submissionIsValid = new SubmissionValidator().validateAllFields(submission);
        System.out.println("Submission is valid: " + submissionIsValid);
        return submission;
    }

    private void printSubmissionRequest(Submission submission, HttpServletRequest request){
        String s = "Submission received from: " + request.getRemoteAddr() + '\n' +
                submission;
        System.out.println(s);
    }
}



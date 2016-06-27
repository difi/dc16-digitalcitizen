package digitalcitizen;



import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class SubmitController {


    @RequestMapping(value="/send", method = RequestMethod.POST)
    public @ResponseBody Submission post( @RequestBody final Submission submission) {


        System.out.println(submission.getLocation());
        return submission;
    }

}



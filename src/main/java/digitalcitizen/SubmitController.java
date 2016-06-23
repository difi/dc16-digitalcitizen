package digitalcitizen;



import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
public class SubmitController {
    @RequestMapping(value = "/send", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    String Submit(@RequestBody Submission sub) {

        System.out.println(sub);

        return "";
    }
}



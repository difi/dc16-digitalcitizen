package digitalcitizen;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
public class SubmitController {

    @RequestMapping(value = "/send", method = RequestMethod.POST)
    public @ResponseBody String processAJAXRequest(
            @RequestParam("name") String firstname,
            @RequestParam("age") String lastname	) {
        String response = "";
        // Process the request
        // Prepare the response string
        System.out.println("FOrm submitted");
        return ""; 
    }


}
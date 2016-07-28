package digitalcitizen.controllers;

import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@Controller
public class ProxyController {

    private ArrayList<String> pnrNumbers = new ArrayList<>();
    // TODO: Map SessionId to pnr
    //private HashMap<String, String> pnrNumbers = new HashMap<>();

    /**
     * Handles the request sent by the proxy on log in. Retrieves data from the HTTP header
     * for further use, and redirects the user to index.html.
     *
     * @return Redirect route to "index.html"
     */
    @RequestMapping(value = "/")
    public String getRequest(HttpServletRequest request) {

        String pnr = request.getHeader("X-DifiProxy-pid");
        // TODO: Add SessionId and Pnr to HashMap
        //pnrNumbers.add(request.getSession().getId(), pnr);
        pnrNumbers.add(pnr);
        return "index.html";
    }

    /**
     * Retrieves the PID of a signed in user.
     * PID is automatically requested when a user is redirected to index.html.
     *
     * @return {@link Person} containing the PID
     */
    @CrossOrigin
    @RequestMapping(value = "/api/getPNR", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Person getPNRbyCode(HttpServletRequest request) {

        //TODO: Get pnr by SessionId
        //String pnr = pnrNumbers.get(request.getSession().getId());
        String pnr = pnrNumbers.get(pnrNumbers.size() - 1);
        return TestData.PERSONS.stream().filter(p -> p.getPnr().equals(pnr)).findFirst().get();
    }
}

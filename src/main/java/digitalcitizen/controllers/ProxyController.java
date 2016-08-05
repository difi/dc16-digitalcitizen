package digitalcitizen.controllers;

import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@Controller
public class ProxyController {

    /**
     * Handles the request sent by the proxy on log in. Redirects the user to index.html.
     *
     * @return Redirect route to "index.html"
     */
    @RequestMapping(value = "/")
    public String getRequest(HttpServletRequest request) {
        return "index.html";
    }

    /**
     * Retrieves the name of a signed in user.
     * Name is automatically requested when a user is redirected to index.html.
     *
     * @return {@link Person} containing the PID
     */
    @CrossOrigin
    @RequestMapping(value = "/api/getName", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public Person getPNRbyCode(HttpServletRequest request) {

        String pnr = request.getHeader("X-DifiProxy-pid");
        return TestData.PERSONS.stream().filter(p -> p.getPnr().equals(pnr)).findFirst().get();
    }
}

package digitalcitizen.controllers;


import digitalcitizen.models.Person;
import digitalcitizen.utilities.TestData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class HttpRequestController {

    private ArrayList<String> pnrNumbers = new ArrayList<>();
    // TODO: Map SessionId to pnr
    //private HashMap<String, String> pnrNumbers = new HashMap<>();

    @RequestMapping(value = "/")
    public String getRequest(HttpServletRequest request) {

        String pnr = request.getHeader("X-DifiProxy-pid");
        // TODO: Add SessionId and Pnr to HashMap
        //pnrNumbers.add(request.getSession().getId(), pnr);
        pnrNumbers.add(pnr);
        return "index.html";
    }

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

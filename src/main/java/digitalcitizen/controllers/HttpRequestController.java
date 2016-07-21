package digitalcitizen.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class HttpRequestController {

    @RequestMapping("/")
    public String getRequest(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("HEST: " + request.getHeader("X-DifiProxy-pid"));
        return "";
    }


}

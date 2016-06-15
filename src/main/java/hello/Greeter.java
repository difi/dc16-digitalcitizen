package hello;

/**
 * Created by camp-cha on 14.06.2016.
 */

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class Greeter {
   // public String sayHello() {
    //     return "Hello world!";
   // }
    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", required = false, defaultValue = "World") String name, Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }
}

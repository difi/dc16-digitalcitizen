package hello;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by camp-cha on 14.06.2016.
 */
//public class HelloWorld {
//    public static void main(String[] args) {
//        LocalTime currentTime = new LocalTime();
//        System.out.println("Current local time is: " + currentTime);
//        Greeter greeter = new Greeter();
        //System.out.println(greeter.sayHello());
// }
// }

@SpringBootApplication
public class HelloWorld {

    public static void main(String[] args) {
        SpringApplication.run(HelloWorld.class, args);
    }

}

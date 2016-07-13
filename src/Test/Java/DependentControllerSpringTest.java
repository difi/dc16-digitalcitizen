import digitalcitizen.models.Address;
import digitalcitizen.models.Doctor;
import digitalcitizen.models.Person;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


/**
 * Created by camp-vhe on 13.07.2016.
 */


public class DependentControllerSpringTest extends AbstractControllerTest {




    @Before
    public void setUp(){
        super.setUp();
    }

    @Test
    public void testGetPerson() throws Exception {
        Person testPerson = new Person("01108019146", "Test Person1", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no", new Doctor("Tore", "Trondheim"));
        String uri = "http://localhost:9090/api/dependent?pnr=01108019146";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON)).andReturn();
        String content = result.getResponse().getContentAsString();
        System.out.println(content);
        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status 200", 200, status );
        Assert.assertTrue("Failure - expected HTTP response body to have a value", content.trim().length()>0);
        Assert.assertEquals("Failure - expected Person to be the correct Person", content, testPerson)
    }
}
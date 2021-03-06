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


public class PersonControllerSpringTest extends AbstractControllerTest {


    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void testGetPersonWithCorrectName() throws Exception {
        String uri = "http://localhost:9090/api/person?pnr=01108019146&name=Eldar Eldarsen";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON)).andReturn();

        String content = result.getResponse().getContentAsString();

        System.out.println(content);
        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status 200", 200, status);
        Assert.assertTrue("Failure - expected HTTP response body to have a value", content.trim().length() > 0);
        Assert.assertTrue("Failure - expected Person to be the correct Person", Boolean.valueOf(content));
    }

    @Test
    public void testGetPersonWithIncorrectName() throws Exception {
        String uri = "http://localhost:9090/api/person?pnr=01108019146&name=Erlend";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON)).andReturn();

        String content = result.getResponse().getContentAsString();

        System.out.println(content);
        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status 200", 200, status);
        Assert.assertTrue("Failure - expected HTTP response body to have a value", content.trim().length() > 0);
        Assert.assertFalse("Failure - expected Person to be the correct Person", Boolean.valueOf(content));
    }
}

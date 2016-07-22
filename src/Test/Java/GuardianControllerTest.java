import digitalcitizen.models.Address;
import digitalcitizen.models.Doctor;
import digitalcitizen.models.Person;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;


/**
 * Created by camp-vhe on 13.07.2016.
 */


public class GuardianControllerTest extends AbstractControllerTest {


    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void testGetGuardians() throws Exception {
        List<Person> testData = Arrays.asList(
                new Person("15028047425", "Test Person2", new Address("Trondheim", "NO", "Trondheim", "testveien 2", "7030"), "99999991", "test@test.no", new Doctor("Tore", "Trondheim")),
                new Person("13019870019", "Test Person3", new Address("Trondheim", "NO", "Trondheim", "testveien 3", "7030"), "99999992", "test@test.org", new Doctor("Tore", "Trondheim")));
        String uri = "http://localhost:9090/api/guardians?pnr=01108019146";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON)).andReturn();

        String content = result.getResponse().getContentAsString();

        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status 200", 200, status);
        Assert.assertTrue("Failure - expected HTTP response body to have a value", content.trim().length() > 0);
        Assert.assertEquals("Failure - expected List of Guardian to be the correct Data", mapToJson(testData), content);
    }
}

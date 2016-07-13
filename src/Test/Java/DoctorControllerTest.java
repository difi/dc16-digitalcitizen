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


public class DoctorControllerTest extends AbstractControllerTest {




    @Before
    public void setUp(){
        super.setUp();
    }

    @Test
    public void testGetDoctors() throws Exception {
        List<Doctor> testData = Arrays.asList(new Doctor("Henrik", "Oslo"), new Doctor("Trine", "Oslo"));
        String uri = "http://localhost:9090/api/doctors?loc=Oslo";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON)).andReturn();

        String content = result.getResponse().getContentAsString();

        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status 200", 200, status );
        Assert.assertTrue("Failure - expected HTTP response body to have a value", content.trim().length()>0);
       Assert.assertEquals("Failure - expected List of Doctors to be the correct data", mapToJson(testData), content);
    }
}

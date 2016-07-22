import digitalcitizen.models.NursingHome;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.Arrays;
import java.util.List;


public class HomeControllerTest extends AbstractControllerTest {

    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void testGetHomes() throws Exception {
        List<NursingHome> testData = Arrays.asList(new NursingHome(1,"Frogner sykehjem", "Oslo"),
                new NursingHome(2,"Manglerud sykehjem", "Oslo"),
                new NursingHome(3,"Ryen sykehjem", "Oslo"));

        String uri = "http://localhost:9090/api/homes?mun=Oslo";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.APPLICATION_JSON)).andReturn();

        String content = result.getResponse().getContentAsString();

        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status 200", 200, status);
        Assert.assertTrue("Failure - expected HTTP response body to have a value", content.trim().length() > 0);
        Assert.assertEquals("Failure - expected Person to be the correct Person", mapToJson(testData), content);
    }
}

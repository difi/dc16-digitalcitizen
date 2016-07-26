import digitalcitizen.models.NursingHome;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import java.util.Arrays;
import java.util.List;


public class MunicipalityControllerTest extends AbstractControllerTest {

    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void testGetMunicipality() throws Exception {


        String uri = "http://localhost:9090/api/municipality?pnr=01108019146";
        MvcResult result = mvc.perform(MockMvcRequestBuilders.get(uri).accept(MediaType.TEXT_PLAIN)).andReturn();

        String content = result.getResponse().getContentAsString();

        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status 200", 200, status);
        Assert.assertTrue("Failure - expected HTTP response body to have a value", content.trim().length() > 0);
        Assert.assertEquals("Failure - expected municipality to be correct", "Trondheim", content);
    }
}
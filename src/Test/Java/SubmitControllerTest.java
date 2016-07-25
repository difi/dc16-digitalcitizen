import digitalcitizen.models.*;
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


public class SubmitControllerTest extends AbstractControllerTest {


    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void testSubmit() throws Exception {

        List<Dependent> dependents = Arrays.asList(new Dependent("Kong Harald", "99999992", "test@test.org", "Kongen din"));
        Submission submission = new Submission(
                true,
                new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"),
                        "99999990", "test@test.no", new Doctor("Tore", "Trondheim")),
                dependents, "lenge", "ingen", "Ingen", "ingen",
                new NursingHome(1,"Frogner sykehjem", "Oslo")
        );
        String uri = "http://localhost:9090/send";
        String inputJSON = mapToJson(submission);
        MvcResult result = mvc.perform(MockMvcRequestBuilders.post(uri).contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON).content(inputJSON)).andReturn();

        String content = result.getResponse().getContentAsString();


        int status = result.getResponse().getStatus();

        Assert.assertEquals("failure - expected HTTP status 200", 200, status);
        Assert.assertTrue("Failure - expected HTTP response body to have a value", content.trim().length() > 0);
        Assert.assertEquals("This should be the first of submissions sent to server", content, "0");

    }
}

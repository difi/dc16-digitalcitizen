import digitalcitizen.models.*;
import digitalcitizen.utilities.PDFManager;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

/**
 * Created by camp-vhe on 14.07.2016.
 */
public class PDFManagerTest {
    PDFManager manager;
    Submission submission;
    @Before
    public void runBeforeTests() {
         manager = new PDFManager();
        List<Dependent> dependents = Arrays.asList(new Dependent("Kong", "Harald", "99999992", "test@test.org", "Kongen din"), null, null);
         submission = new Submission(true, new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no", new Doctor("Tore", "Trondheim")), dependents, "lenge", "ingen", "Ingen", "ingen", new NursingHome("Frogner sykehjem", "Oslo"));
    }

    @Test
    public void testPDFManager() {
        try {
            manager.generatePDFofSubmission(submission);
        } catch (IOException e) {
            Assert.fail("IO Exception");
        }


    }
}

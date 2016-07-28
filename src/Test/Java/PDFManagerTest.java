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
    List<Dependent> dependents;

    @Before
    public void runBeforeTests() {

        manager = new PDFManager();
        dependents = Arrays.asList(new Dependent("Kong Harald", "99999992", "test@test.org", "Annet", "Kongen din"), new Dependent("Dronning Sonja", "99999999", "dronning@norge.no", "Annet", "Dronningen din"), new Dependent("Prinsesse Martha", "99999999", "princess@norge.no", "Annet", "Prinsessa di"));
        submission = new Submission(true, new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no", new Doctor("Tore", "Trondheim")), dependents, "lenge", "ingen", "Ingen", "ingen", new NursingHome(1, "Frogner sykehjem", "Oslo"));
    }

    @Test
    public void testPDFManagerWithThreeDependents() {
        try {
            submission = new Submission(true, new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no", new Doctor("Tore", "Trondheim")), dependents, "lenge", "ingen", "Ingen", "ingen", new NursingHome(1, "Frogner sykehjem", "Oslo"));
            manager.generatePDFofSubmission(submission);
        } catch (IOException e) {
            Assert.fail("IO Exception");
        }


    }

    @Test
    public void testPDFManagerWithTwoDependents() {
        try {
            dependents.set(2, null);
            submission = new Submission(true, new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no", new Doctor("Tore", "Trondheim")), dependents, "lenge", "ingen", "Ingen", "ingen", new NursingHome(1, "Frogner sykehjem", "Oslo"));
            manager.generatePDFofSubmission(submission);
        } catch (IOException e) {
            Assert.fail("IO Exception");
        }


    }

    @Test
    public void testPDFManagerWithOneDependent() {
        try {
            dependents.set(1, null);
            dependents.set(2, null);
            submission = new Submission(true, new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no", new Doctor("Tore", "Trondheim")), dependents, "lenge", "ingen", "Ingen", "ingen", new NursingHome(1, "Frogner sykehjem", "Oslo"));
            manager.generatePDFofSubmission(submission);
        } catch (IOException e) {
            Assert.fail("IO Exception");
        }


    }
}

import digitalcitizen.controllers.DependentController;
import digitalcitizen.models.Address;
import digitalcitizen.models.Doctor;
import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;
import digitalcitizen.models.Person;
import org.junit.runner.JUnitCore;
import org.junit.runner.Result;
import org.junit.runner.notification.Failure;

public class DependentControllerTest extends TestCase {


    private DependentController controller;

    protected void setUp() {
        controller = new DependentController();
    }


    public void testGetPersonByPnrShouldReturnPerson() {
        Person test = new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no", new Doctor("Tore", "Trondheim"));
        Person p = controller.getPersonasDependent("01108019146", null);
        assertTrue(p.equals(test));

    }

    /*public static void main(String[] args) {
        Result result = JUnitCore.runClasses(DependentControllerTest.class);
        for (Failure failure : result.getFailures()) {
            System.out.println(failure.toString());
        }
        System.out.println(result.wasSuccessful());
    }*/
}




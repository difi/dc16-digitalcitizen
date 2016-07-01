package digitalcitizen.utilities;

import digitalcitizen.models.Address;
import digitalcitizen.models.Doctor;
import digitalcitizen.models.Person;

/**
 * Created by camp-shj on 01.07.2016.
 */
public class TestData {

    public static final Doctor[] DOCTORS = {
            new Doctor("Tore", "trondheim"),
            new Doctor("Pelle", "trondheim"),
            new Doctor("Henrik", "oslo"),
            new Doctor("Trine", "oslo"),
            new Doctor("Kine", "molde"),
            new Doctor("Vegard", "sogndal"),
            new Doctor("Ola", "sogndal"),
            new Doctor("Nils", "sogndal"),
    };

    public static final Person[] PERSONS = {
            new Person("01019011111", "TestPerson1", new Address("trondheim", "NO", "testveien 1", "7030"), "99999990"),
            new Person("01019011112", "TestPerson2", new Address("trondheim", "NO", "testveien 2", "7030"), "99999991"),
            new Person("01019011113", "TestPerson3", new Address("trondheim", "NO", "testveien 3", "7030"), "99999992"),
            new Person("01019011114", "TestPerson4", new Address("oslo", "NO", "testveien 4", "0001"), "99999993"),
            new Person("01019011115", "TestPerson5", new Address("oslo", "NO", "testveien 5", "0001"), "99999994"),
            new Person("01019011116", "TestPerson6", new Address("sogndal", "NO", "testveien 6", "6856"), "99999995"),
            new Person("01019011117", "TestPerson7", new Address("sogndal", "NO", "testveien 7", "6856"), "99999996"),
    };

}

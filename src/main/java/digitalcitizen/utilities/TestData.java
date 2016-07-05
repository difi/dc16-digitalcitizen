package digitalcitizen.utilities;

import digitalcitizen.models.Address;
import digitalcitizen.models.Doctor;
import digitalcitizen.models.Person;

/**
 * Created by camp-shj on 01.07.2016.
 */
public class TestData {

    public static final Doctor[] DOCTORS = {
            new Doctor("Tore", "Trondheim"),
            new Doctor("Pelle", "Trondheim"),
            new Doctor("Henrik", "Oslo"),
            new Doctor("Trine", "Oslo"),
            new Doctor("Kine", "Molde"),
            new Doctor("Vegard", "Sogndal"),
            new Doctor("Ola", "Sogndal"),
            new Doctor("Nils", "Sogndal"),
    };

    public static final Person[] PERSONS = {
            new Person("01019011111", "TestPerson1", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990"),
            new Person("01019011112", "TestPerson2", new Address("Trondheim", "NO", "Trondheim", "testveien 2", "7030"), "99999991"),
            new Person("01019011113", "TestPerson3", new Address("Trondheim", "NO", "Trondheim", "testveien 3", "7030"), "99999992"),
            new Person("01019011114", "TestPerson4", new Address("Oslo", "NO", "Oslo", "testveien 4", "0001"), "99999993"),
            new Person("01019011115", "TestPerson5", new Address("Oslo", "NO", "Oslo", "testveien 5", "0001"), "99999994"),
            new Person("01019011116", "TestPerson6", new Address("Sogndal", "NO", "Sogndal", "testveien 6", "6856"), "99999995"),
            new Person("01019011117", "TestPerson7", new Address("Sogndal", "NO", "Sogndal", "testveien 7", "6856"), "99999996"),
    };

}
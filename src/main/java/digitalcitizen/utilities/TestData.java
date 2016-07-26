package digitalcitizen.utilities;

import digitalcitizen.models.Address;
import digitalcitizen.models.Doctor;
import digitalcitizen.models.Person;
import digitalcitizen.models.Guardian;
import digitalcitizen.models.NursingHome;

import java.util.Arrays;
import java.util.Collection;

public class TestData {

    public static final Collection<Doctor> DOCTORS = Arrays.asList(
            new Doctor("Tore", "Trondheim"),
            new Doctor("Pelle", "Trondheim"),
            new Doctor("Henrik", "Oslo"),
            new Doctor("Trine", "Oslo"),
            new Doctor("Kine", "Molde"),
            new Doctor("Vegard", "Sogndal"),
            new Doctor("Ola", "Sogndal"),
            new Doctor("Nils", "Sogndal")
    );

    public static final Collection<Person> PERSONS = Arrays.asList(
            new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no", new Doctor("Tore", "Trondheim")),
            new Person("15028047425", "Elias Eliassen", new Address("Trondheim", "NO", "Trondheim", "testveien 2", "7030"), "99999991", "test@test.no", new Doctor("Tore", "Trondheim")),
            new Person("13019870019", "Melissa Melissasen", new Address("Trondheim", "NO", "Trondheim", "testveien 3", "7030"), "99999992", "test@test.org", new Doctor("Pelle", "Trondheim")),
            new Person("13118208018", "Mia Miasen", new Address("Oslo", "NO", "Oslo", "testveien 4", "0001"), "99999993", "test@test.sexy", new Doctor("Henrik", "Oslo")),
            new Person("29109632323", "Mildrid Mildridsen", new Address("Oslo", "NO", "Oslo", "testveien 5", "0001"), "99999994", "test@test.net", new Doctor("Trine", "Oslo")),
            new Person("06126620649", "Solfrid Solfridsen", new Address("Sogndal", "NO", "Sogndal", "testveien 6", "6856"), "99999995", "test@test.com", new Doctor("Ola", "Sogndal")),
            new Person("27072118958", "Tom Tomsen", new Address("Sogndal", "NO", "Sogndal", "testveien 7", "6856"), "99999996", "test@test.no", new Doctor("Vegard", "Sogndal")),
            new Person("10115914931", "Line", new Address("Sogndal", "NO", "Sogndal", "testveien 7", "6856"), "99999996", "test@test.no", new Doctor("Nils", "Sogndal")),
            new Person("08023549930", "Vegard den tøffe gutten", new Address("Sogndal", "NO", "Sogndal", "testveien 7", "6856"), "99999996", "test@test.no", new Doctor("Nils", "Sogndal"))
    );

    public static final Collection<Guardian> GUARDIANS = Arrays.asList(
            new Guardian("01108019146",
                    Arrays.asList(
                            new Person("15028047425", "Elias Eliassen", new Address("Trondheim", "NO", "Trondheim", "testveien 2", "7030"), "99999991", "test@test.no", new Doctor("Tore", "Trondheim")),
                            new Person("27072118958", "Tom Tomsen", new Address("Sogndal", "NO", "Sogndal", "testveien 7", "6856"), "99999996", "test@test.no", new Doctor("Vegard", "Sogndal")))

            ),
            new Guardian("08023549930",
                    Arrays.asList(
                            new Person("06126620649", "Solfrid Solfridsen", new Address("Sogndal", "NO", "Sogndal", "testveien 6", "6856"), "99999995", "test@test.com", new Doctor("Vegard", "Sogndal")),
                            new Person("13019870019", "Melissa Melissasen", new Address("Trondheim", "NO", "Trondheim", "testveien 3", "7030"), "99999992", "test@test.org", new Doctor("Tore", "Trondheim"))))
    );

    public static final Collection<NursingHome> HOMES = Arrays.asList(
            new NursingHome(1, "Frogner sykehjem", "Oslo"),
            new NursingHome(2, "Manglerud sykehjem", "Oslo"),
            new NursingHome(3, "Ryen sykehjem", "Oslo"),
            new NursingHome(4, "Sentrum sykehjem", "Trondheim"),
            new NursingHome(5, "Moholt sykehjem", "Trondheim"),
            new NursingHome(6, "Sogndal sykehjem", "Sogndal"),
            new NursingHome(7, "Lund sykehjem", "Kristiansand"),
            new NursingHome(8, "Kvadraturen sykehjem", "Kristiansand"),
            new NursingHome(9, "Stokka sykehjem", "Stavanger"),
            new NursingHome(10, "Aasane sykehjem", "Bergen"),
            new NursingHome(11, "Fjellet sykehjem", "Bergen"),
            new NursingHome(12, "Bamble sykehjem", "Bamble"),
            new NursingHome(13, "Molde sykehjem", "Molde")
    );
}

package digitalcitizen.utilities;

import digitalcitizen.models.Address;
import digitalcitizen.models.Doctor;
import digitalcitizen.models.Person;
import digitalcitizen.models.Guardian;
import digitalcitizen.models.Nursing_Home;

import java.util.Arrays;
import java.util.Collection;

/**
 * Created by camp-shj on 01.07.2016.
 */
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
            new Person("01108019146", "Eldar Eldarsen", new Address("Trondheim", "NO", "Trondheim", "testveien 1", "7030"), "99999990", "test@test.no"),
            new Person("15028047425", "Elias Eliassen", new Address("Trondheim", "NO", "Trondheim", "testveien 2", "7030"), "99999991", "test@test.no"),
            new Person("13019870019", "Melissa Melissasen", new Address("Trondheim", "NO", "Trondheim", "testveien 3", "7030"), "99999992", "test@test.org"),
            new Person("13118208018", "Mia Miasen", new Address("Oslo", "NO", "Oslo", "testveien 4", "0001"), "99999993", "test@test.sexy"),
            new Person("29109632323", "Mildrid Mildridsen", new Address("Oslo", "NO", "Oslo", "testveien 5", "0001"), "99999994", "test@test.net"),
            new Person("06126620649", "Solfrid Solfridsen", new Address("Sogndal", "NO", "Sogndal", "testveien 6", "6856"), "99999995", "test@test.com"),
            new Person("27072118958", "Tom Tomsen", new Address("Sogndal", "NO", "Sogndal", "testveien 7", "6856"), "99999996", "test@test.no")
    );

    public static final Collection<Guardian> GUARDIANS = Arrays.asList(
            new Guardian("01108019146", Arrays.asList(new Person("15028047425", "Test Person2", new Address("Trondheim", "NO", "Trondheim", "testveien 2", "7030"), "99999991", "test@test.no"),
                    new Person("13019870019", "Test Person3", new Address("Trondheim", "NO", "Trondheim", "testveien 3", "7030"), "99999992", "test@test.org"))),
            new Guardian("15028047425", Arrays.asList(new Person("06126620649", "Test Person6", new Address("Sogndal", "NO", "Sogndal", "testveien 6", "6856"), "99999995", "test@test.com")))
    );
    public static final Collection<Nursing_Home> HOMES = Arrays.asList(
       new Nursing_Home("Frogner sykehjem", "Oslo"),
       new Nursing_Home("Abildsø sykehjem", "Oslo") ,
       new Nursing_Home("Ryen sykehjem", "Oslo") ,
       new Nursing_Home("Sentrum sykehjem", "Trondheim") ,
       new Nursing_Home("Byåsen sykehjem", "Trondheim") ,
       new Nursing_Home("Sogndal sykehjem", "Sogndal")
    );
}

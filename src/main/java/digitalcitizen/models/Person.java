package digitalcitizen.models;

import digitalcitizen.utilities.TestData;

/**
 * Created by camp-shj on 24.06.2016.
 */
public class Person {

    private String pnr;
    private String name;
    private Address address;
    private String telephone;
    private String mail ;
    private Doctor doctor;

    public Person() {
    }

    public Person(String pnr, String name, Address address, String telephone) {
        this.pnr = pnr;
        this.name = name;
        this.address = address;
        this.telephone = telephone;
    }
    public Person(String pnr, String name, Address address, String telephone, String mail, Doctor doctor) {
        this.pnr = pnr;
        this.name = name;
        this.address = address;
        this.telephone = telephone;
        this.mail = mail;
        this.doctor = doctor;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getPnr() {
        return pnr;
    }

    public void setPnr(String pnr) {
        this.pnr = pnr;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Person person = (Person) o;

        if (!pnr.equals(person.pnr)) return false;
        if (!name.equals(person.name)) return false;
        if (address != null ? !address.equals(person.address) : person.address != null) return false;
        return telephone != null ? telephone.equals(person.telephone) : person.telephone == null;
    }

    public boolean pnrAndNameEquals(Person person) {
        return pnr.equals(person.pnr) && name.equals(person.name);
    }

    public boolean updateValuesByPnr() {
        // TODO: Implement more efficient search
        for (Person p : TestData.PERSONS) {
            if (pnr.equals(p.pnr)) {
                // TODO: Find a better way to update values
                setAddress(p.getAddress());
                setName(p.getName());
                setTelephone(p.getTelephone());
                setDoctor(p.getDoctor());
                return true;
            }
        }
        return false;
    }

    @Override
    public String toString() {
        return "Person{" +
                "pnr='" + pnr + '\'' +
                ", name='" + name + '\'' +
                ", address=" + address +
                ", telephone='" + telephone + '\'' +
                '}';
    }

}

package digitalcitizen.models;

/**
 * Created by camp-shj on 24.06.2016.
 */
public class Person {

    private String pnr;
    private String name;
    private Address address;
    private String telephone;

    public Person(){
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

    public void setAddress(Address address) {
        this.address = address;
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

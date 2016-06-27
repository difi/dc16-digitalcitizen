package digitalcitizen.models;

/**
 * Created by camp-shj on 24.06.2016.
 */
public class Dependent {

    // TODO: Superclass for Dependent and Person?

    private String name;
    private String address;
    private String telephone;

    public Dependent(){
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

}

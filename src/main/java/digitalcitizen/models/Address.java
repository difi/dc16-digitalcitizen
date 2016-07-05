package digitalcitizen.models;

/**
 * Created by camp-shj on 27.06.2016.
 */
public class Address {

    private String postal;
    private String country;
    private String municipality;
    private String streetAddress;
    private String zipcode;


    public Address(){
    }

    public Address(String postal, String country, String municipality, String streetAddress, String zipcode) {
        this.postal = postal;
        this.country = country;
        this.municipality = municipality;
        this.streetAddress = streetAddress;
        this.zipcode = zipcode;
    }

    public String getPostal() {
        return postal;
    }

    public void setPostal(String postal) {
        this.postal = postal;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getCountry() {
        return country;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    @Override
    public String toString() {
        return "Address{" +
                "postal='" + postal + '\'' +
                ", country='" + country + '\'' +
                ", streetAddress='" + streetAddress + '\'' +
                ", zipcode='" + zipcode + '\'' +
                '}';
    }
}

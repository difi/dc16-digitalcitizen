package digitalcitizen.models;

/**
 * Created by camp-shj on 27.06.2016.
 */
public class Address {

    private String postal;
    private String country;
    private String municipality;
    private String street;
    private String zipcode;


    public Address(){
    }

    public Address(String postal, String country, String municipality, String street, String zipcode) {
        this.postal = postal;
        this.country = country;
        this.municipality = municipality;
        this.street = street;
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

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Address address = (Address) o;

        if (postal != null ? !postal.equals(address.postal) : address.postal != null) return false;
        if (country != null ? !country.equals(address.country) : address.country != null) return false;
        if (municipality != null ? !municipality.equals(address.municipality) : address.municipality != null)
            return false;
        if (street != null ? !street.equals(address.street) : address.street != null) return false;
        return zipcode != null ? zipcode.equals(address.zipcode) : address.zipcode == null;

    }

    @Override
    public String toString() {
        return "Address{" +
                "postal='" + postal + '\'' +
                ", country='" + country + '\'' +
                ", municipality='" + municipality + '\'' +
                ", street='" + street + '\'' +
                ", zipcode='" + zipcode + '\'' +
                '}';
    }
}

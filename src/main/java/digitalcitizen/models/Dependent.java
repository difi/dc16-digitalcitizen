package digitalcitizen.models;

/**
 * Created by camp-shj on 24.06.2016.
 */
public class Dependent {

    // TODO: Superclass for Dependent and Person?

    private String firstName;
    private String lastName;
    private String telephone;
    private String email;
    private String relation;

    public Dependent(){
    }

    public Dependent(String firstName, String lastName, String telephone, String email, String relation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.telephone = telephone;
        this.email = email;
        this.relation = relation;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    @Override
    public String toString() {
        return "Dependent{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", telephone='" + telephone + '\'' +
                ", email='" + email + '\'' +
                ", relation='" + relation + '\'' +
                '}';
    }
}

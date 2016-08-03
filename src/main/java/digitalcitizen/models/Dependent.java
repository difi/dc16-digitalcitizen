package digitalcitizen.models;

public class Dependent {

    private String name;
    private String telephone;
    private String email;
    private String relation;
    private String depOtherRelation;

    public Dependent(){
    }

    public Dependent(String name, String telephone, String email, String relation) {
        this.name = name;
        this.telephone = telephone;
        this.email = email;
        this.relation = relation;
    }

    public Dependent(String name, String telephone, String email, String relation, String otherRelation) {
        this.name = name;
        this.telephone = telephone;
        this.email = email;
        this.relation = relation;
        this.depOtherRelation = otherRelation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
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

    public String getDepOtherRelation() {
        return depOtherRelation;
    }

    public void setDepOtherRelation(String depOtherRelation) {
        this.depOtherRelation = depOtherRelation;
    }

    @Override
    public String toString() {
        return "Dependent{" +
                "name='" + name + '\'' +
                ", telephone='" + telephone + '\'' +
                ", email='" + email + '\'' +
                ", relation='" + relation + '\'' +
                ", depOtherRelation='" + depOtherRelation + '\'' +
                '}';
    }
}

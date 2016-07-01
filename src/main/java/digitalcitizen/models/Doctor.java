package digitalcitizen.models;

/**
 * Created by camp-shj on 24.06.2016.
 */
public class Doctor {

    private String name;

    public Doctor() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "name='" + name + '\'' +
                '}';
    }
}

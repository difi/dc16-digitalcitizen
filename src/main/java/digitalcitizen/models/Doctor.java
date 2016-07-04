package digitalcitizen.models;

/**
 * Created by camp-shj on 24.06.2016.
 */
public class Doctor {

    private String name;
    private String location;

    public Doctor() {
    }

    public Doctor(String name, String location){
        this.name = name;
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "name='" + name + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}

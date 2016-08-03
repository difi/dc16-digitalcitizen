package digitalcitizen.models;

public class Doctor {

    private String name;
    private String location;

    public Doctor() {
    }

    public Doctor(String name, String location) {
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Doctor doctor = (Doctor) o;

        if (!name.equals(doctor.name)) return false;
        return location.equals(doctor.location);
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "name='" + name + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}

package digitalcitizen.models;

public class NursingHome {

    private int num;
    private String name;
    private String municipality;

    public NursingHome() {
    }

    public NursingHome(int num, String name, String municipality) {
        this.num = num;
        this.name = name;
        this.municipality = municipality;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Override
    public String toString() {
        return "NursingHome{" +
                "name='" + name + '\'' +
                ", municipality='" + municipality + '\'' +
                ", num=" + num +
                '}';
    }
}

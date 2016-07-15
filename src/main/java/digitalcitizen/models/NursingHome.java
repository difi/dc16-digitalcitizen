package digitalcitizen.models;

/**
 * Created by camp-vhe on 12.07.2016.
 */
public class NursingHome {

    private String name;
    private String municipality;
    private int num;

    public NursingHome() {
    }

    public NursingHome(int num,String name, String municipality) {
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

    public int getNum() {
        return num;
    }

    public void setNum(int num) { this.num=num; }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }


}

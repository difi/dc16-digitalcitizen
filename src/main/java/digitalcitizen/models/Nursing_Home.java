package digitalcitizen.models;

/**
 * Created by camp-vhe on 12.07.2016.
 */
public class Nursing_Home {

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

    public Nursing_Home(int num,String name, String municipality) {
        this.num = num;
        this.name = name;
        this.municipality = municipality;
    }


    private int num;
    private String name;
    private String municipality;
}

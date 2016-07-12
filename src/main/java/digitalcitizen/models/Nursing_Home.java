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

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public Nursing_Home(String name, String municipality) {

        this.name = name;
        this.municipality = municipality;
    }

    private String name;
    private String municipality;
}

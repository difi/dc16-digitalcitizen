package digitalcitizen;

/**
 * Created by camp-vhe on 23.06.2016.
 */
public class Submission {

    private String name;
    private String location;


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
    public Submission(String name, String location){
        this.name = name;
        this.location = location;
    }
    public Submission(){
    }




}

package digitalcitizen.models;

/**
 * Created by camp-vhe on 08.07.2016.
 */
public class Guardian {

    private String pnr ;
    private String[] guardianFor;

    public Guardian(String pnr, String[] guardianFor) {
        this.pnr = pnr;
        this.guardianFor = guardianFor;
    }

    public String getPNR() {

        return pnr;
    }

    public void setPNR(String pnr) {
        this.pnr = pnr;
    }

    public String[] getGuardianFor() {
        return guardianFor;
    }

    public void setGuardianFor(String[] guardianFor) {
        this.guardianFor = guardianFor;
    }
}

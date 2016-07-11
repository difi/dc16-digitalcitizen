package digitalcitizen.models;

import java.util.Collection;

/**
 * Created by camp-vhe on 08.07.2016.
 */
public class Guardian {

    private String pnr ;
    private Collection<Person> guardianFor;

    public Guardian(String pnr, Collection<Person> guardianFor) {
        this.pnr = pnr;
        this.guardianFor = guardianFor;
    }

    public String getPNR() {

        return pnr;
    }

    public void setPNR(String pnr) {
        this.pnr = pnr;
    }

    public Collection<Person> getGuardianFor() {
        return guardianFor;
    }

    public void setGuardianFor(Collection<Person> guardianFor) {
        this.guardianFor = guardianFor;
    }
}

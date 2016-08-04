package digitalcitizen.models;

import java.util.Collection;

/**
 * The Guardian model is used for mapping the pnr of a guardian to multiple {@link Person} objects.
 * (One-to-many relation).
 */
public class Guardian {

    private String pnr ;
    private Collection<Person> guardianFor;

    public Guardian(String pnr, Collection<Person> guardianFor) {
        this.pnr = pnr;
        this.guardianFor = guardianFor;
    }

    public String getPnr() {
        return pnr;
    }

    public void setPnr(String pnr) {
        this.pnr = pnr;
    }

    public Collection<Person> getGuardianFor() {
        return guardianFor;
    }

    public void setGuardianFor(Collection<Person> guardianFor) {
        this.guardianFor = guardianFor;
    }

    @Override
    public String toString() {
        return "Guardian{" +
                "pnr='" + pnr + '\'' +
                ", guardianFor=" + guardianFor +
                '}';
    }
}

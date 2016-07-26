package digitalcitizen.utilities;

import digitalcitizen.models.Dependent;
import digitalcitizen.models.Person;
import digitalcitizen.models.Submission;

import java.util.List;

public class SubmissionValidator {

    public SubmissionValidator() {
    }

    public boolean validateAllFields(Submission submission) {
        return (
                validatePerson(submission.getPerson()) &&
                        validateDependents(submission.getDependents())
        );
    }

    private boolean validatePerson(Person person) {
        // TODO: Implement more efficient search
        for (Person p : TestData.PERSONS) {
            if (p.pnrAndNameEquals(person)) {
                return true;
            }
        }
        return false;
    }

    private boolean validateDependents(List<Dependent> dependents) {
        // TODO: Compare the fields of dependents to entries in Folkeregisteret
        return true;
    }

}

package digitalcitizen.utilities;

import digitalcitizen.models.Dependent;
import digitalcitizen.models.Person;
import digitalcitizen.models.Submission;

import java.util.ArrayList;

/**
 * Created by camp-shj on 28.06.2016.
 */
public class SubmissionValidator {

    private Submission submission;

    public SubmissionValidator(Submission submission) {
        this.submission = submission;
    }

    public SubmissionValidator() {
    }

    public boolean validateAllFields(Submission submission) {
        return (
                validatePerson(submission.getPerson()) &&
                        validateDependents(submission.getDependents())
        );
    }

    private boolean validatePerson(Person person) {
        // TODO: Compare the fields of person to entry in Folkeregisteret
        return false;
    }

    private boolean validateDependents(ArrayList<Dependent> dependents) {
        // TODO: Compare the fields of dependents to entries in Folkeregisteret
        return true;
    }

}

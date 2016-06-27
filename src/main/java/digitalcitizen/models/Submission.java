package digitalcitizen.models;

import java.util.ArrayList;

/**
 * Created by camp-vhe on 23.06.2016.
 */
public class Submission {
    // First form
    private boolean isApplyingForSelf;
    // Second form
    private String relation;
    private boolean isDependent;
    // Third form
    private Person person;
    // Fourth form
    private Doctor doctor; // {}, // Object
    // Fifth form
    private ArrayList<Dependent> dependents; // List of objects
    // Sixth form
    private String lengthOfStay;
    // Seventh form
    private String specialNeeds;
    private Boolean needsInterpreter;

    public Submission(){
    }

    public boolean isApplyingForSelf() {
        return isApplyingForSelf;
    }

    public void setApplyingForSelf(boolean applyingForSelf) {
        isApplyingForSelf = applyingForSelf;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public boolean isDependent() {
        return isDependent;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public void setDependent(boolean dependent) {
        isDependent = dependent;
    }

    public ArrayList<Dependent> getDependents() {
        return dependents;
    }

    public void setDependents(ArrayList<Dependent> dependents) {
        this.dependents = dependents;
    }


    public String getLengthOfStay() {
        return lengthOfStay;
    }

    public void setLengthOfStay(String lengthOfStay) {
        this.lengthOfStay = lengthOfStay;
    }

    public Boolean getNeedsInterpreter() {
        return needsInterpreter;
    }

    public void setNeedsInterpreter(Boolean needsInterpreter) {
        this.needsInterpreter = needsInterpreter;
    }

    public String getSpecialNeeds() {
        return specialNeeds;
    }

    public void setSpecialNeeds(String specialNeeds) {
        this.specialNeeds = specialNeeds;
    }

}

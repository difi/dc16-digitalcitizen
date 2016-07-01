package digitalcitizen.models;

import java.util.ArrayList;

/**
 * Created by camp-vhe on 23.06.2016.
 */
public class Submission {

    // First form
    private boolean applyingForSelf;
    // Second form
    private String relation;
    private String guardianName;
    private String typeOfRelation;
    private boolean dependent;
    // Third form
    private Person person;
    // Fourth form
    private Doctor doctor; // {}, // Object
    // Fifth form
    private ArrayList<Dependent> dependents; // List of objects
    // Sixth form
    private String lengthOfStay;
    // Seventh form
    private String medicalNeeds;
    private String conditionChanges;
    private String otherNeeds;

    public Submission() {
    }

    public String getConditionChanges() {
        return conditionChanges;
    }

    public void setConditionChanges(String conditionChanges) {
        this.conditionChanges = conditionChanges;
    }

    public String getGuardianName() {
        return guardianName;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getMedicalNeeds() {
        return medicalNeeds;
    }

    public void setMedicalNeeds(String medicalNeeds) {
        this.medicalNeeds = medicalNeeds;
    }

    public String getOtherNeeds() {
        return otherNeeds;
    }

    public void setOtherNeeds(String otherNeeds) {
        this.otherNeeds = otherNeeds;
    }

    public String getTypeOfRelation() {
        return typeOfRelation;
    }

    public void setTypeOfRelation(String typeOfRelation) {
        this.typeOfRelation = typeOfRelation;
    }

    public boolean isApplyingForSelf() {
        return applyingForSelf;
    }

    public void setApplyingForSelf(boolean applyingForSelf) {
        this.applyingForSelf = applyingForSelf;
    }

    public boolean isDependent() {
        return dependent;
    }

    public void setDependent(boolean dependent) {
        this.dependent = dependent;
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

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
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

    @Override
    public String toString() {
        return "Submission{" +
                "applyingForSelf=" + applyingForSelf +
                ", relation='" + relation + '\'' +
                ", guardianName='" + guardianName + '\'' +
                ", typeOfRelation='" + typeOfRelation + '\'' +
                ", dependent=" + dependent +
                ", person=" + person +
                ", doctor=" + doctor +
                ", dependents=" + dependents +
                ", lengthOfStay='" + lengthOfStay + '\'' +
                ", medicalNeeds='" + medicalNeeds + '\'' +
                ", conditionChanges='" + conditionChanges + '\'' +
                ", otherNeeds='" + otherNeeds + '\'' +
                '}';
    }
}


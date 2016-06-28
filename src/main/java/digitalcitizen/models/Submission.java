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
    private String guardianName;
    private String familyRelation;

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
    private String medicalNeeds;
    private String conditionChanges;
    private String otherNeeds;

    public Submission(){
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

    public String getFamilyRelation() {
        return familyRelation;
    }

    public void setFamilyRelation(String familyRelation) {
        this.familyRelation = familyRelation;
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

    public boolean isApplyingForSelf() {
        return isApplyingForSelf;
    }

    public void setApplyingForSelf(boolean applyingForSelf) {
        isApplyingForSelf = applyingForSelf;
    }

    public boolean isDependent() {
        return isDependent;
    }

    public void setDependent(boolean dependent) {
        isDependent = dependent;
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

    }


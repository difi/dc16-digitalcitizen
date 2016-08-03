package digitalcitizen.models;

import org.springframework.data.annotation.Id;

import java.util.List;

/**
 * The Submission model is used for storing all required data concerning an application.
 */
public class Submission {

    @Id
    private String id;

    private boolean applyingForSelf;
    private String conditionChanges;
    private boolean dependent;
    private List<Dependent> dependents;
    private String guardianName;
    private String lengthOfStay;
    private String medicalNeeds;
    private NursingHome nursingHome;
    private String otherNeeds;
    private Person person;
    private String relation;
    private String typeOfRelation;
    private String guardianPnr;

    public Submission() {
    }

    public Submission(boolean applyingForSelf, Person person, List<Dependent> dependents, String lengthOfStay, String medicalNeeds, String conditionChanges, String otherNeeds, NursingHome nursingHome) {
        this.applyingForSelf = applyingForSelf;
        this.conditionChanges = conditionChanges;
        this.dependents = dependents;
        this.lengthOfStay = lengthOfStay;
        this.medicalNeeds = medicalNeeds;
        this.nursingHome = nursingHome;
        this.otherNeeds = otherNeeds;
        this.person = person;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isApplyingForSelf() {
        return applyingForSelf;
    }

    public void setApplyingForSelf(boolean applyingForSelf) {
        this.applyingForSelf = applyingForSelf;
    }

    public String getConditionChanges() {
        return conditionChanges;
    }

    public void setConditionChanges(String conditionChanges) {
        this.conditionChanges = conditionChanges;
    }

    public boolean isDependent() {
        return dependent;
    }

    public void setDependent(boolean dependent) {
        this.dependent = dependent;
    }

    public List<Dependent> getDependents() {
        return dependents;
    }

    public void setDependents(List<Dependent> dependents) {
        this.dependents = dependents;
    }

    public String getGuardianName() {
        return guardianName;
    }

    public void setGuardianName(String guardianName) {
        this.guardianName = guardianName;
    }

    public String getLengthOfStay() {
        return lengthOfStay;
    }

    public void setLengthOfStay(String lengthOfStay) {
        this.lengthOfStay = lengthOfStay;
    }

    public String getMedicalNeeds() {
        return medicalNeeds;
    }

    public void setMedicalNeeds(String medicalNeeds) {
        this.medicalNeeds = medicalNeeds;
    }

    public NursingHome getNursingHome() {
        return nursingHome;
    }

    public void setNursingHome(NursingHome nursingHome) {
        this.nursingHome = nursingHome;
    }

    public String getOtherNeeds() {
        return otherNeeds;
    }

    public void setOtherNeeds(String otherNeeds) {
        this.otherNeeds = otherNeeds;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getTypeOfRelation() {
        return typeOfRelation;
    }

    public void setTypeOfRelation(String typeOfRelation) {
        this.typeOfRelation = typeOfRelation;
    }

    public String getGuardianPnr() {
        return guardianPnr;
    }

    public void setGuardianPnr(String guardianPnr) {
        this.guardianPnr = guardianPnr;
    }

    @Override
    public String toString() {
        return "Submission{" +
                "id='" + id + '\'' +
                ", applyingForSelf=" + applyingForSelf +
                ", conditionChanges='" + conditionChanges + '\'' +
                ", dependent=" + dependent +
                ", dependents=" + dependents +
                ", guardianName='" + guardianName + '\'' +
                ", lengthOfStay='" + lengthOfStay + '\'' +
                ", medicalNeeds='" + medicalNeeds + '\'' +
                ", nursingHome=" + nursingHome +
                ", otherNeeds='" + otherNeeds + '\'' +
                ", person=" + person +
                ", relation='" + relation + '\'' +
                ", typeOfRelation='" + typeOfRelation + '\'' +
                ", guardianPnr='" + guardianPnr + '\'' +
                '}';
    }
}


package digitalcitizen.utilities;

import java.io.File;
import java.io.IOException;
import java.util.List;

import digitalcitizen.models.Submission;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDField;

/**
 * Created by camp-shj on 04.07.2016.
 */
public class PDFManager {

    // TODO: Add more templates?
    public File template = new File("src\\main\\resources\\formTemplate.pdf");

    public String generatePDFofSubmission(Submission submission) throws IOException {

        PDDocument pdfTemplate = PDDocument.load(template);
        PDDocumentCatalog docCatalog = pdfTemplate.getDocumentCatalog();
        PDAcroForm acroForm = docCatalog.getAcroForm();

        // Get field names
        List<PDField> fieldList = acroForm.getFields();

        // String the object array
        String[] fieldArray = new String[fieldList.size()];
        int i = 0;
        for (PDField sField : fieldList) {
            fieldArray[i] = sField.getFullyQualifiedName();
            i++;
        }

        // Loop through each field in the array and write data
        for (String f : fieldArray) {
            PDField field = acroForm.getField(f);
            String value;
            switch (f) {
                // PERSON
                case "pnr":
                    value = submission.getPerson().getPnr();
                    field.setValue(value);
                    break;
                case "name":
                    value = submission.getPerson().getName();
                    field.setValue(value);
                    break;
                case "address":
                    value = submission.getPerson().getAddress().getStreet();
                    field.setValue(value);
                    break;
                case "zipcode":
                    value = submission.getPerson().getAddress().getZipcode();
                    field.setValue(value);
                    break;
                case "municipality":
                    value = submission.getPerson().getAddress().getMunicipality();
                    field.setValue(value);
                    break;
                case "telephone":
                    value = submission.getPerson().getTelephone();
                    field.setValue(value);
                    break;
                // DEPENDENT 1
                case "dep1_name":
                    value = submission.getDependents().get(0).getFirstName() + " " + submission.getDependents().get(0).getLastName();
                    field.setValue(value);
                    break;
                case "dep1_telephone":
                    value = submission.getDependents().get(0).getTelephone();
                    field.setValue(value);
                    break;
                case "dep1_rel":
                    value = submission.getDependents().get(0).getRelation();
                    field.setValue(value);
                    break;
                case "dep1_email":
                    value = submission.getDependents().get(0).getEmail();
                    field.setValue(value);
                    break;
                // DEPENDENT 2
                case "dep2_name":
                    if(submission.getDependents().get(1) != null) {
                        value = submission.getDependents().get(1).getFirstName() + " " + submission.getDependents().get(1).getLastName();
                        field.setValue(value);
                    }
                    break;
                case "dep2_telephone":
                    if(submission.getDependents().get(1) != null) {
                        value = submission.getDependents().get(1).getTelephone();
                        field.setValue(value);
                    }
                    break;
                case "dep2_rel":
                    if(submission.getDependents().get(1) != null) {
                        value = submission.getDependents().get(1).getRelation();
                        field.setValue(value);
                    }
                    break;
                case "dep2_email":
                    if(submission.getDependents().get(1) != null) {
                        value = submission.getDependents().get(1).getEmail();
                        field.setValue(value);
                    }
                    break;
                // DEPENDENT 3
                case "dep3_name":
                    if(submission.getDependents().get(2) != null) {
                        value = submission.getDependents().get(2).getFirstName() + " " + submission.getDependents().get(2).getLastName();
                        field.setValue(value);
                    }
                    break;
                case "dep3_telephone":
                    if(submission.getDependents().get(2) != null) {
                        value = submission.getDependents().get(2).getTelephone();
                        field.setValue(value);
                    }
                    break;
                case "dep3_rel":
                    if(submission.getDependents().get(2) != null) {
                        value = submission.getDependents().get(2).getRelation();
                        field.setValue(value);
                    }
                    break;
                case "dep3_email":
                    if(submission.getDependents().get(2) != null) {
                        value = submission.getDependents().get(2).getEmail();
                        field.setValue(value);
                    }
                    break;
                // Length of stay checkboxes
                /*
                case "lengthOfStay":
                    System.out.println(field.getWidgets());
                    for (Object s : field.getWidgets()){
                        ((PDCheckBox) s).check();
                    }
                    break; */
                // DIV
                case "doctor":
                    value = submission.getDoctor().getName();
                    field.setValue(value);
                    break;
                // NEEDS
                case "medicalNeeds":
                    value = submission.getMedicalNeeds();
                    field.setValue(value);
                    break;
                case "reason":
                    value = submission.getConditionChanges();
                    field.setValue(value);
                    break;
                case "otherNeeds":
                    value = submission.getOtherNeeds();
                    field.setValue(value);
                    break;
            }
        }

        // TODO: Auto-generate name and change location of server stored PDF-files
        String path = "src\\main\\resources\\static\\testPDF1.pdf";
        File output = new File(path);

        pdfTemplate.save(output);
        pdfTemplate.close();
        return path;
    }
}
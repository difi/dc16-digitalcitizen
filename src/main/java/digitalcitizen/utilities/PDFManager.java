package digitalcitizen.utilities;

import java.io.File;
import java.io.IOException;
import java.util.List;

import digitalcitizen.models.Address;
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
    public File template = new File("src\\main\\resources\\formTemplate4.pdf");

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
            switch(f) {
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
                case "doctor":
                    value = submission.getDoctor().getName();
                    field.setValue(value);
                    break;
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
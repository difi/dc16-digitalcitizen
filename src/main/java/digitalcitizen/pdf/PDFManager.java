package digitalcitizen.pdf;

import java.io.File;
import java.io.IOException;
import java.util.List;

import digitalcitizen.models.Submission;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDField;


public class PDFManager {

    public File template = new File("src\\main\\resources\\formTemplate2.pdf");

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

        // Loop through each field in the array and do something
        for (String f : fieldArray) {
            PDField field = acroForm.getField(f);
            String value;
            switch(f) {
                case "name":
                    value = submission.getPerson().getName();
                    field.setValue(value);
                    break;
                case "address":
                    value = submission.getPerson().getAddress().getMunicipality();
                    field.setValue(value);
                    break;
            }
        }

        // TODO: Auto-generate name of PDF-file
        String path = "src\\main\\resources\\static\\testPDF1.pdf";
        File outPut = new File(path);

        pdfTemplate.save(outPut);
        pdfTemplate.close();
        return path;
    }
}
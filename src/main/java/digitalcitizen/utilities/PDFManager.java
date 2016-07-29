package digitalcitizen.utilities;

import digitalcitizen.models.Submission;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDField;

public class PDFManager {

    // TODO: Add more templates?
    private File dep1_template = getResourceAsFile("formTemplate_dep1.pdf");
    private File dep2_template = getResourceAsFile("formTemplate_dep2.pdf");
    private File dep3_template = getResourceAsFile("formTemplate_dep3.pdf");

    /**
     * A method that utilizes the PDFBox library in order to fill a PDF template with data
     * from a {@link Submission}. The generated PDF-file is saved on the server.
     *
     * @param submission A {@link Submission} containing the data needed to fill the template.
     * @return The method returns the location (path) of the file on the server.
     * @throws IOException
     */
    public String generatePDFofSubmission(Submission submission) throws IOException {

        PDDocument pdfTemplate = new PDDocument();

        if (submission.getDependents().get(0) != null && submission.getDependents().get(1) == null && submission.getDependents().get(2) == null) {

            pdfTemplate = PDDocument.load(dep1_template);
        } else if (submission.getDependents().get(0) != null && submission.getDependents().get(1) != null && submission.getDependents().get(2) == null) {

            pdfTemplate = PDDocument.load(dep2_template);
        } else if (submission.getDependents().get(0) != null && submission.getDependents().get(1) != null && submission.getDependents().get(2) != null) {

            pdfTemplate = PDDocument.load(dep3_template);
        }


        Map<String, String> fieldsAndValues = new HashMap<String, String>() {
            {
                put("pnr", submission.getPerson().getPnr());
                put("name", submission.getPerson().getName());
                put("telephone", submission.getPerson().getTelephone());
                put("address", submission.getPerson().getAddress().getStreet());
                put("zipcode", submission.getPerson().getAddress().getZipcode());
                put("municipality", submission.getPerson().getAddress().getMunicipality());
                put("doctor", submission.getPerson().getDoctor().getName());
                put("medicalNeeds", submission.getMedicalNeeds());
                put("reason", submission.getConditionChanges());
                put("otherNeeds", submission.getOtherNeeds());
                put("nursing_mun", submission.getNursingHome().getMunicipality());
                put("nursing_name", submission.getNursingHome().getName());
                put("lengthOfStay", submission.getLengthOfStay().equals("long") ? "1" : "0");
                put("dep1_name", submission.getDependents().get(0).getName());
                put("dep1_telephone", submission.getDependents().get(0).getTelephone());
                String dep1_rel = submission.getDependents().get(0).getRelation().equals("Annet") ?
                        submission.getDependents().get(0).getDepOtherRelation() :
                        submission.getDependents().get(0).getRelation();
                put("dep1_rel", dep1_rel);
                put("dep1_email", submission.getDependents().get(0).getEmail());
                if (submission.getDependents().get(1) != null) {
                    put("dep2_name", submission.getDependents().get(1).getName());
                    put("dep2_telephone", submission.getDependents().get(1).getTelephone());
                    String dep2_rel = submission.getDependents().get(1).getRelation().equals("Annet") ?
                            submission.getDependents().get(1).getDepOtherRelation() :
                            submission.getDependents().get(1).getRelation();
                    put("dep2_rel", dep2_rel);
                    put("dep2_email", submission.getDependents().get(1).getEmail());
                }
                if (submission.getDependents().get(2) != null) {
                    put("dep3_name", submission.getDependents().get(2).getName());
                    put("dep3_telephone", submission.getDependents().get(2).getTelephone());
                    String dep3_rel = submission.getDependents().get(2).getRelation().equals("Annet") ?
                            submission.getDependents().get(2).getDepOtherRelation() :
                            submission.getDependents().get(2).getRelation();
                    put("dep3_rel", dep3_rel);
                    put("dep3_email", submission.getDependents().get(2).getEmail());
                }
            }
        };

        PDDocumentCatalog docCatalog = pdfTemplate.getDocumentCatalog();
        PDAcroForm acroForm = docCatalog.getAcroForm();

        System.out.println("Creating pdf of " + submission);
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
            field.setValue(fieldsAndValues.get(f));
        }

        // TODO: Auto-generate name and change location of server stored PDF-files
        String path = "testPDF1.pdf";
        File output = new File("testPDF1.pdf");

        pdfTemplate.save(output);
        pdfTemplate.close();
        System.out.println("PDF was created successfully");
        return path;
    }

    private static File getResourceAsFile(String resourcePath) {
        try {
            InputStream in = ClassLoader.getSystemClassLoader().getResourceAsStream(resourcePath);
            if (in == null) {
                return null;
            }

            File tempFile = File.createTempFile(String.valueOf(in.hashCode()), ".tmp");
            tempFile.deleteOnExit();

            try (FileOutputStream out = new FileOutputStream(tempFile)) {
                //copy stream
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = in.read(buffer)) != -1) {
                    out.write(buffer, 0, bytesRead);
                }
            }
            return tempFile;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
package digitalcitizen.controllers;

import digitalcitizen.models.Submission;
import digitalcitizen.utilities.PDFManager;
import digitalcitizen.utilities.SubmissionValidator;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

@RestController
public class SubmitController {

    // TODO: Replace with database
    public ArrayList<Submission> submissions = new ArrayList<>();

    @CrossOrigin
    @RequestMapping(value="/send", method = RequestMethod.POST)
    public @ResponseBody
    String post(@RequestBody final Submission submission, HttpServletRequest request) throws IOException {

        // TODO: Validate form
        boolean submissionIsValid = new SubmissionValidator().validateAllFields(submission);
        System.out.println("Submission is valid: " + submissionIsValid);
        // TODO: Add submission to database
        printSubmissionRequest(submission, request);
        submissions.add(handleSubmissionFields(submission));
        // Return the id of the submission
        return Integer.toString(submissions.size() - 1);
    }

    private void printSubmissionRequest(Submission submission, HttpServletRequest request){
        String s = "Submission received from: " + request.getRemoteAddr() + '\n' +
                submission;
        System.out.println(s);
    }


    private Submission handleSubmissionFields(Submission submission) {
        if(submission.getPerson().getPnr() != null && !submission.getPerson().getPnr().equals("")){
            submission.getPerson().updateValuesByPnr();
        }
        return submission;
    }

    /**
     *
     * @param id The id of the submission we want to generate a PDF-file from.
     * @return HTTP containing the generated PDF-file
     * @throws IOException
     */
    @CrossOrigin
    @RequestMapping(value="/getpdf", params = "id", method=RequestMethod.GET)
    public ResponseEntity<byte[]> getPDF(@RequestParam("id") String id) throws IOException {

        // TODO: Get Submission from database by id
        PDFManager pdfManager = new PDFManager();
        Path path = Paths.get(pdfManager.generatePDFofSubmission(submissions.get(Integer.parseInt(id))));
        byte[] contents = Files.readAllBytes(path);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        String filename = "Søknad.pdf";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        // TODO: Authenticate the user before sending the PDF-file
        return new ResponseEntity<>(contents, headers, HttpStatus.OK);
    }
}



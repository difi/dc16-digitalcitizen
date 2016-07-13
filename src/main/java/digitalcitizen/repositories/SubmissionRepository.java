package digitalcitizen.repositories;

/**
 * Created by camp-shj on 12.07.2016.
 */

import digitalcitizen.models.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubmissionRepository extends MongoRepository<Submission, String> {

    Submission findById(String id);

}
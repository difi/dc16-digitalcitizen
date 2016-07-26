package digitalcitizen.repositories;

import digitalcitizen.models.Submission;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubmissionRepository extends MongoRepository<Submission, String> {

    Submission findById(String id);

}
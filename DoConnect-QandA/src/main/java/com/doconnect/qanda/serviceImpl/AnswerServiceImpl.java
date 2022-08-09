package com.doconnect.qanda.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doconnect.qanda.entity.Answer;
import com.doconnect.qanda.entity.Question;
import com.doconnect.qanda.entity.User;
import com.doconnect.qanda.exceptions.AnswerNotFoundException;
import com.doconnect.qanda.repository.AnswerRepository;
import com.doconnect.qanda.repository.UserRepository;

@Service
public class AnswerServiceImpl {

	@Autowired
	private AnswerRepository answerRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	
	@Autowired
	private EmailSenderService emailService;
	
	public Answer addAnswer(Answer answer,Long answeredUserId,Long answeredQuestionId) {
		answer.setAnsweredDateAndTime(LocalDateTime.now());
		User user = new User();
		user.setUserId(answeredUserId);
		Question question = new Question();
		question.setQuestionId(answeredQuestionId);
		answer.setUser_answer(user);
		answer.setQuestion(question);
		
		Optional<User> user_ = userRepository.findById(answeredUserId);
		if(user_.isPresent()) {
			user = user_.get();
			if(user.getRoles().equals("ROLE_USER")) {
				answerRepository.save(answer);
			emailService.sendEmail("rahb78205@gmail.com", "Answer Approval" , "Answer given by "+user.getFirstName()+" "+user.getLastName());
			}
			else {
				answer.setApprovedByAdmin(true);
				answerRepository.save(answer);
			}
			}
		return answer;
	}
	
	public Answer findAnswerById(Long answerId) {
		Answer answer = new Answer();
		try {
			Optional<Answer> answer_ = Optional.of(answerRepository.findById(answerId).orElseThrow(()->new AnswerNotFoundException("Answer Not Found!")));
			answer = answer_.get();
		} catch (AnswerNotFoundException e) {
			System.out.println(e.getMessage());
			return null;
		}	
		return answer;
				
	}
	
	public String deleteAnswerById(Long answerId) {
		   Answer answer = findAnswerById(answerId);
		   answerRepository.deleteById(answerId);
		System.err.println("deleted");
		return "Answer Deleted";
	}

	public List<Answer> getAnswerForApproval() {
		
		return answerRepository.findByIsApprovedByAdmin(false);
	}
	
}

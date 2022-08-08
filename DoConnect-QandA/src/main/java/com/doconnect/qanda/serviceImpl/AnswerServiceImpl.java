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

@Service
public class AnswerServiceImpl {

	@Autowired
	private AnswerRepository answerRepository;
	
	
	public Answer addAnswer(Answer answer,Long answeredUserId,Long answeredQuestionId) {
		answer.setAnsweredDateAndTime(LocalDateTime.now());
		User user = new User();
		user.setUserId(answeredUserId);
		Question question = new Question();
		question.setQuestionId(answeredQuestionId);
		answer.setUser_answer(user);
		answer.setQuestion(question);
		return answerRepository.save(answer);
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
		findAnswerById(answerId);
		answerRepository.deleteById(answerId);
		return "Answer Deleted";
	}

	public List<Answer> getAnswerForApproval() {
		return answerRepository.findByIsApprovedByAdmin(false);
	}
	
}

package com.doconnect.qanda.serviceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.doconnect.qanda.entity.Answer;
import com.doconnect.qanda.entity.Question;
import com.doconnect.qanda.entity.User;
import com.doconnect.qanda.exceptions.QuestionNotFoundException;
import com.doconnect.qanda.repository.QuestionRepository;

@Service
public class QuestionServiceImpl {

	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	private AnswerServiceImpl answerService;
	
	
	public Question addQuestion(Question question, Long userId) {
		question.setAskedDateAndTime(LocalDateTime.now());
		User user = new User();
		user.setUserId(userId);
		question.setUser_question(user);
		//Path path = Paths.get("H:\\Capstone_Project\\questionImg");
//		try {
//			 Files.copy(questionImg.getInputStream(),path.resolve(questionImg.getOriginalFilename()));
//			String imgpath  = path.toString()+"\\"+questionImg.getOriginalFilename();
//			System.out.println(imgpath);
//			question.setImgPath(imgpath);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		return questionRepository.save(question);
	}
	
	public List<Question> getQuestionList(){
		return questionRepository.findAll();
	}
	
	public Question findQuestionById(Long questionId) {
		Question question = new Question();
		try {
			Optional<Question> question_ = Optional.of(questionRepository.findById(questionId).orElseThrow(()-> new QuestionNotFoundException("Question Not Found!")));
			question = question_.get();
		} catch (QuestionNotFoundException e) {
			System.out.println(e.getMessage());
			return null;
		}
		return question;
	}
	
	public List<Question> getQuestionsWithTheseWords(String words){
		Question questionWithTheseWords = new Question();
		questionWithTheseWords.setQuestion(words);
		System.out.println(questionWithTheseWords);
		ExampleMatcher exampleMatcher = ExampleMatcher.matching().withMatcher("question", GenericPropertyMatchers.contains()).withIgnoreCase().withIgnorePaths("questionId","answers","topic","isApprovedByAdmin");
		
		Example<Question> example = Example.of(questionWithTheseWords,exampleMatcher);
		
//		List<Question> questions = questionRepository.findAll(example);
//		List<Question> approvedQuestions = new ArrayList<>();
//		for(Question q:questions) {
//			if(q.isApprovedByAdmin()) {
//				approvedQuestions.add(q);
//			}
//		}
		return questionRepository.findAll(example);
	}
	
	public Question updateQuestion(Long questionId,Question questionToBeUpdated) {
		Question question =  findQuestionById(questionId);
		question = questionToBeUpdated;
		return questionRepository.save(question);
	}
	
	public String deleteQuestionById(Long id) {
		Question question = findQuestionById(id);
		questionRepository.deleteById(question.getQuestionId());
		return "Question "+question.getQuestion()+" Deleted";
	}
	
	public Question findQuestionByAnswerId(Long answerId) {
		Answer answer = answerService.findAnswerById(answerId);
		return answer.getQuestion();
	}
	
	public List<Answer> findAnswersByQuestionId(Long questionId) {
		Question question =  findQuestionById(questionId);
		System.out.println(question.getAnswers());
		return question.getAnswers();
	}
	
	public int storeImage(MultipartFile file, Long id) {
		if(file!=null) {
			try {
				Path filePath = Paths.get("H:\\Capstone_Project\\questionImg");
				Files.copy(file.getInputStream(), filePath.resolve(file.getOriginalFilename()));
				String imgpath  = filePath.toString()+"\\"+file.getOriginalFilename();
				System.out.println(imgpath);
				
				Question question = new Question();
				question = findQuestionById(id);
				question.setImgPath(imgpath);
				questionRepository.save(question);
			} catch (Exception e) {
				e.printStackTrace();
				return -1;
			}
		}
		return 1;
	}
	
	
}

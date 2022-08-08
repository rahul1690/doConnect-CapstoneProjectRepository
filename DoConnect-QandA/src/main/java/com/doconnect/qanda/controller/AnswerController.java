package com.doconnect.qanda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.qanda.entity.Answer;
import com.doconnect.qanda.serviceImpl.AnswerServiceImpl;

@RestController
@RequestMapping("/answer")
@CrossOrigin(origins = "*")
public class AnswerController {
	
	@Autowired
	private AnswerServiceImpl answerService;
	
	@PostMapping("/addAnswer")
	public Answer addAnswer(@RequestBody Answer answer,@RequestParam(name = "answeredUserId") Long answeredUserId,@RequestParam(name="answeredQuestionId") Long answeredQuestionId) {
		System.out.println(answeredQuestionId);
		System.out.println("answer");
		return answerService.addAnswer(answer,answeredUserId,answeredQuestionId);
	}
	
	@GetMapping("/deleteAnswerById/{answerId}")
	public String deleteAnswerById(@PathVariable Long answerId) {
		return answerService.deleteAnswerById(answerId);
	}
	
	@GetMapping("/getAnswerById/{answerId}")
	public Answer getAnswerById(@PathVariable Long answerId) {
		return answerService.findAnswerById(answerId);
	}
}

package com.doconnect.qanda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.qanda.entity.Answer;
import com.doconnect.qanda.entity.Question;
import com.doconnect.qanda.entity.User;
import com.doconnect.qanda.serviceImpl.AnswerServiceImpl;
import com.doconnect.qanda.serviceImpl.QuestionServiceImpl;
import com.doconnect.qanda.serviceImpl.UserServiceImpl;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminRoleController {

	
	@Autowired
	UserServiceImpl userService;
	
	@Autowired
	QuestionServiceImpl questionService;
	
	@Autowired
	AnswerServiceImpl answerService;
	
	@PostMapping("/registerAdmin")
	public int registerAdmin(@RequestBody User user) {
		user.setRoles("ROLE_ADMIN");
		return userService.addUser(user);
	}
	
	@GetMapping("/getUsers")
	public List<User> getUsers(){
		return userService.getUserList();
	}
	
	@DeleteMapping("/deleteUserById/{userId}")
	public String deleteUserById(@PathVariable Long userId) {
		return userService.deleteUserById(userId);
	}
	
	@PostMapping("/updateUserById/{userId}")
	public User updateUserById(@PathVariable Long userId,@RequestBody User user) {
		return userService.updateUser(userId, user);
	}
	
	@GetMapping("/findUserByAnswerId/{answerId}")
	public User findUserByAnswerId(@PathVariable Long answerId) {
		return userService.findUserByAnswerId(answerId);
	}
	
	@GetMapping("/findUserByQuestionId/{questionId}")
	public User findUserByQuestionId(@PathVariable Long questionId) {
		return userService.findUserByQuestionId(questionId);
	}
	
	@GetMapping("/getQuestionsForApproval")
	public List<Question> getQuestionsForApproval(){
		return questionService.getQuestionsForApproval();
	}
	
	@GetMapping("/getAnswersForApproval")
	public List<Answer> getAnswersForApproval(){
		return answerService.getAnswerForApproval();
		}
	
	@GetMapping("/approveQuestionById/{questionId}")
	public int approveQuestionById(@PathVariable Long questionId) {
		return userService.approveQuestionById(questionId);
	}
	
	@GetMapping("/approveAnswerById/{answerId}")
	public int approveAnswerById(@PathVariable Long answerId) {
		return userService.approveAnswerById(answerId);
	}
}

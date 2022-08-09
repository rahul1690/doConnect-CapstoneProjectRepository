package com.doconnect.qanda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.qanda.entity.Message;
import com.doconnect.qanda.serviceImpl.MessageServiceImpl;

@RestController
@RequestMapping("/message")
@CrossOrigin( origins = "*")
public class MessageController {

	@Autowired
	MessageServiceImpl messageService;
	
	@PostMapping("/addMessage/{userId}")
	public Message addMessage(@PathVariable Long userId, @RequestBody Message message) {
		return messageService.addMessage(message, userId);
	}
	
	@GetMapping("/getMessages")
	public List<Message> getMessages() {
		return messageService.getMessages();
	}
}

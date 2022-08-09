package com.doconnect.qanda.serviceImpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doconnect.qanda.entity.Message;
import com.doconnect.qanda.entity.User;
import com.doconnect.qanda.repository.MessageRepository;

@Service
public class MessageServiceImpl {
	
	@Autowired
	MessageRepository messageRepository;
	
	@Autowired
	WebSocketService webSocketService;
	
	public Message addMessage(Message message,Long userId) {
		message.setMessageTime(LocalDateTime.now());
		User user = new User();
		user.setUserId(userId);
		message.setUser(user);
		message = messageRepository.save(message);
		notifyChat();
		return message;
	}
	
	public List<Message> getMessages(){
		return messageRepository.findAll();
	}
	
	public void deleteAllMessages() {
		messageRepository.deleteAll();
		notifyChat();
	}
	
	public void notifyChat() {
		final String entityTopic = getEntityTopic();
		if(entityTopic == null) {
			System.out.println("Failed to get entity topic");
			return;
		}
		
		webSocketService.sendMessage(entityTopic);
	}
	
	public String getEntityTopic() {
		return "message";
	}
}

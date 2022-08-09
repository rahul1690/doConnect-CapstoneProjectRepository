package com.doconnect.qanda.serviceImpl;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

	private final SimpMessagingTemplate simpMessagingTemplate;
	
	public WebSocketService(final SimpMessagingTemplate simpMessagingTemplate) {
		this.simpMessagingTemplate = simpMessagingTemplate;
	}
	
	public void sendMessage(final String topicSuffix) {
		simpMessagingTemplate.convertAndSend("/topic/"+topicSuffix,"Message From WebSocket Service!");
	}
	
}

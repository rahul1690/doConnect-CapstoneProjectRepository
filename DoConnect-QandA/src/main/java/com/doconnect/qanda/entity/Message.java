package com.doconnect.qanda.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Message {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "message_id")
	private Long messageId;

	private String message;
	
	private LocalDateTime messageTime;
	
	@ManyToOne
	@JoinColumn(name = "u_id" , referencedColumnName = "user_id")
	private User user;
}

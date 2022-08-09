package com.doconnect.qanda.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doconnect.qanda.entity.Message;
import com.doconnect.qanda.entity.User;

public interface MessageRepository extends JpaRepository<Message, Long>{

	Optional<Message> findByUser(User user);
}

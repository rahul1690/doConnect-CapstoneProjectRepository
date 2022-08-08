package com.doconnect.qanda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doconnect.qanda.entity.Answer;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long>{

}

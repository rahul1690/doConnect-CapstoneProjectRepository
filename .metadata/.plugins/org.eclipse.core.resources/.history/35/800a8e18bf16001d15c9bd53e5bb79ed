package com.doconnect.qanda.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doconnect.qanda.entity.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long>{
	Question findByIsApprovedByAdmin(boolean isApprovedByAdmin);
}

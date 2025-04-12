package com.examedge.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examedge.entity.Question;
import com.examedge.entity.Quiz;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
	@Query("SELECT q FROM Question q WHERE q.quiz = :quiz")
	List<Question> findAllByQuiz(@Param("quiz") Quiz quiz);

	@Query("SELECT q FROM Question q WHERE q.quiz.id = :quizId")
	List<Question> findQuestionsByQuizId(@Param("quizId") Long quizId);



}

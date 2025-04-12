package com.examedge.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examedge.entity.QuizResult;
import com.examedge.entity.UserQuiz;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, UserQuiz> {
    @Query(value = "SELECT u.fname,u.lname, qr.quiz_id, qr.marks, qr.time " +
            "FROM quiz_result qr " +
            "JOIN users u ON u.id = qr.user_id " +
            "JOIN quiz q ON q.id = qr.quiz_id " +
            "WHERE qr.quiz_id = ?1 " +
            "ORDER BY qr.marks desc, qr.time ", nativeQuery = true)
    List<Object[]> findQuizResultsByQuizId(Long id);

    List<QuizResult> findByQuizId(Long id);

}

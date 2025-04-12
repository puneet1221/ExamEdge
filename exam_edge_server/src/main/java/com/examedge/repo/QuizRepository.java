package com.examedge.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examedge.entity.Category;
import com.examedge.entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
	@Query(value = "select * from quiz where category_id=?1", nativeQuery = true)
	public List<Quiz> findAllByCategoryId(Long id);

	public List<Quiz> findAllByCategory(Category category);
	@Query(value="select * from quiz limit 10",nativeQuery = true)
	public List<Quiz>findTopQuizzes();

}

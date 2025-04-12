package com.examedge.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examedge.entity.Category;
import com.examedge.entity.Quiz;
import com.examedge.entity.QuizResult;
import com.examedge.repo.CategoryRepository;
import com.examedge.repo.QuizRepository;
import com.examedge.repo.QuizResultRepository;

import jakarta.transaction.Transactional;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/quiz")
public class QuizController {

	@Autowired
	private QuizRepository quizRepository;
	@Autowired
	private QuizResultRepository quizResultRepository;
	@Autowired
	private CategoryRepository categoryRepository;

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/createQuiz")
	public ResponseEntity<?> handleCreateQuiz(@RequestBody Quiz quiz, @PathParam(value = "id") Integer id) {
		quiz.setCategory(categoryRepository.findById(id).get());
		quizRepository.save(quiz);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@PostMapping("/createAllQuiz")
	public ResponseEntity<?> handleCreateAllQuiz(@RequestBody List<Quiz> quizList,
			@PathParam(value = "id") Integer id) {
		Category category=categoryRepository.findById(id).get();
		for(Quiz quiz:quizList) {
			quiz.setCategory(category);
		}
		quizRepository.saveAll(quizList);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/getAll")
	public ResponseEntity<List<Quiz>> handleGetAllQuiz() {
		return new ResponseEntity<>(quizRepository.findAll(), HttpStatus.OK);
	}

	// @PreAuthorize("hasAuthority('USER','ADMIN')")
	@GetMapping("/getByCategory/{id}")
	public ResponseEntity<List<Quiz>> handleGetQuizByCategoryId(@PathVariable int id) {
		return new ResponseEntity<>(quizRepository.findAllByCategoryId((long) id), HttpStatus.OK);
	}

	@GetMapping("/getByCategory")
	public ResponseEntity<List<Quiz>> handleGetQuizByCategory(@RequestBody Category category) {
		return new ResponseEntity<>(quizRepository.findAllByCategory(category), HttpStatus.OK);
	}

	@GetMapping("/getTopQuizzes")
	public ResponseEntity<List<Quiz>> getTopQuizzes() {
		return new ResponseEntity<>(quizRepository.findTopQuizzes(), HttpStatus.OK);
	}

	@GetMapping("/result/{quizId}")
	public ResponseEntity<?> getQuizResult(@PathVariable Long quizId) {
		try {
			return new ResponseEntity<>(quizResultRepository.findQuizResultsByQuizId(quizId), HttpStatus.OK);
		} catch (Exception e) {

		}
		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PostMapping("/score")
	@Transactional
	public ResponseEntity<?> postMethodName(@RequestBody QuizResult quizResult) {
		System.err.print("testing the quiz/score/api");
		if (quizResultRepository.findById(quizResult.getUserQuiz()).isEmpty()) {
			quizResultRepository.save(quizResult);
			return new ResponseEntity<>(HttpStatus.CREATED);
		}

		return new ResponseEntity<>(HttpStatus.OK);
	}

}

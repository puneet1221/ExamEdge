package com.examedge.controllers;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examedge.entity.Question;
import com.examedge.entity.Quiz;
import com.examedge.entity.UserComment;
import com.examedge.repo.QuestionRepository;
import com.examedge.repo.UserRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/question/")
public class QuestionController {
	@Autowired
	private QuestionRepository questionRepository;
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/")
	public ResponseEntity<?> createQuestion(Question question) {
		questionRepository.save(question);
		return new ResponseEntity<>("added", HttpStatus.CREATED);
	}

	@PostMapping("/addAll")
	public ResponseEntity<?> addAllQuestions(List<Question> questions) {
		questionRepository.saveAll(questions);
		return new ResponseEntity<>("added", HttpStatus.CREATED);
	}

	@GetMapping("/{quizId}")
	public ResponseEntity<?> findQuestionsByQuizId(@PathVariable Long quizId) {
		return new ResponseEntity<>(questionRepository.findQuestionsByQuizId(quizId), HttpStatus.OK);
	}

	@DeleteMapping("/{quesId}")
	public void deleteQuestion(@PathVariable Long id) {
		questionRepository.deleteById(id);
	}

	@GetMapping("/all/{quizId}")
	public List<Question> getByQuizId(@PathVariable Long id) {
		return questionRepository.findQuestionsByQuizId(id);
	}

	@GetMapping("/all")
	public List<Question> getByQuiz(@RequestBody Quiz quiz) {
		return questionRepository.findAllByQuiz(quiz);
	}

	@DeleteMapping("/all/{quizId}")
	public ResponseEntity<?> deleteAll(@PathVariable Long id) {
		return ResponseEntity.ok("deleted");
	}

	@PostMapping("{id}/comments")
	@Transactional
	public ResponseEntity<?> UploadComment(@PathVariable long id, @RequestBody CommentDTO comment) {

		Question q = questionRepository.findById(id).get();
		UserComment usercomment = new UserComment();
		usercomment.setCommentText(comment.getCommentText());
		usercomment.setQuestion(questionRepository.findById(comment.getQuestionId()).get());
		usercomment.setUser(userRepository.findById(comment.getUserId()).get());
		usercomment.setCreatedAt(comment.getCreatedAt());
		
		q.getCommentsOnQuestion().add(usercomment);
		questionRepository.save(q);
		return new ResponseEntity<>("successfully added",HttpStatus.CREATED);

	}

	@GetMapping("comments/{id}")
	public ResponseEntity<List<UserComment>> getAllComments(@PathVariable Long id) {
		Question q = questionRepository.findById(id).get();
		return new ResponseEntity<List<UserComment>>(q.getCommentsOnQuestion(), HttpStatus.OK);
	}

}

class CommentDTO {
	private Long userId;
	private String commentText;
	private Long questionId;
	private Timestamp createdAt;

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getCommentText() {
		return commentText;
	}

	public void setCommentText(String commentText) {
		this.commentText = commentText;
	}

	public Long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}

}

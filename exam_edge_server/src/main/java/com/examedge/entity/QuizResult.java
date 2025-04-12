package com.examedge.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class QuizResult {

	@EmbeddedId
	private UserQuiz userQuiz;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "user_result"), insertable = false, updatable = false)
	private User user;

	@ManyToOne
	@JoinColumn(name = "quiz_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "quiz_result"), insertable = false, updatable = false)
	private Quiz quiz;
	private Double Marks;
	private Long time;

	public UserQuiz getUserQuiz() {
		return userQuiz;
	}

	public void setUserQuiz(UserQuiz userQuiz) {
		this.userQuiz = userQuiz;
	}

	QuizResult() {

	}

	public Double getMarks() {
		return Marks;
	}

	public Quiz getQuiz() {
		return quiz;
	}

	public Long getTime() {
		return time;
	}

	public User getUser() {
		return user;
	}

	public void setMarks(Double marks) {
		Marks = marks;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}

	public void setTime(Long time) {
		this.time = time;
	}

	public void setUser(User user) {
		this.user = user;
	}

}

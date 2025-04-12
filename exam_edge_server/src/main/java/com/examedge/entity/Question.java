package com.examedge.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String content;

	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question",orphanRemoval = true)
	private List<Choices> options;
	private String imageUrl;

	@JsonManagedReference
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question",orphanRemoval = true)
	private List<UserComment> commentsOnQuestion;

	@JsonBackReference
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "quiz_id", referencedColumnName = "id", foreignKey = @ForeignKey(name = "question_quiz"))
	private Quiz quiz;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<Choices> getOptions() {
		return options;
	}

	public void setOptions(List<Choices> options) {
		this.options = options;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public List<UserComment> getCommentsOnQuestion() {
		return commentsOnQuestion;
	}

	public void setCommentsOnQuestion(List<UserComment> commentsOnQuestion) {
		this.commentsOnQuestion = commentsOnQuestion;
	}

	public Quiz getQuiz() {
		return quiz;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}

}

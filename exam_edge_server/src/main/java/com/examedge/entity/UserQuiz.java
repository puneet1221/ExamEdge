package com.examedge.entity;

import jakarta.persistence.Embeddable;

@Embeddable
public class UserQuiz {

	private Long user_id; // This is the foreign key referencing User
	private Long quiz_id; // This is the foreign key referencing Quiz

	// Default constructor
	public UserQuiz() {
	}

	// Constructor to initialize both fields
	public UserQuiz(Long user_id, Long quiz_id) {
		this.user_id = user_id;
		this.quiz_id = quiz_id;
	}

	// Getters and Setters
	public Long getuser_id() {
		return user_id;
	}

	public void setuser_id(Long user_id) {
		this.user_id = user_id;
	}

	public Long getquiz_id() {
		return quiz_id;
	}

	public void setquiz_id(Long quiz_id) {
		this.quiz_id = quiz_id;
	}

	// Override equals and hashCode (for compound key comparison)
	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserQuiz that = (UserQuiz) o;
		return user_id.equals(that.user_id) && quiz_id.equals(that.quiz_id);
	}

	@Override
	public int hashCode() {
		return 31 * user_id.hashCode() + quiz_id.hashCode();
	}
}

package com.examedge.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class Role {

	@Id
	private Long id;
	private String role_name;
	
	

	public Role() {
		super();

	}

	public Long getId() {
		return id;
	}

	public Role(Long id, String role_name) {
		super();
		this.id = id;
		this.role_name = role_name;
	}

	public Role(String role_name) {
		super();

		this.role_name = role_name;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRole_name() {
		return role_name;
	}

	public void setRole_name(String role_name) {
		this.role_name = role_name;
	}

	

}

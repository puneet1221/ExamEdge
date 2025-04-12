package com.examedge.service;

import java.util.Optional;

import com.examedge.entity.Role;
import com.examedge.entity.User;

public interface UserService {

	
	public void deleteUser(String username);
	public Optional<User> findById(Long id);
	public User findByUsername(String username);
	public Boolean doesUserExist(String email);
	public void save(User u);
	public User createUser(User user, Role userRole);
	

}

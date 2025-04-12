package com.examedge.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examedge.entity.Role;
import com.examedge.entity.User;
import com.examedge.repo.UserRepository;
import com.examedge.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	
	@Autowired
	UserRepository repository;

	@Override
	public User createUser(User user, Role userRole) {
		try {
			Optional<User> user2 = repository.findByUsername(user.getUsername());
			if (user2.isPresent()) {
				return null;
			}

		} catch (Exception e) {
				
		}

		user.setRole(userRole);
		return repository.save(user);
		
		

	}

	@Override
	public void deleteUser(String username) {
		repository.deleteByUsername(username);
		
	}

	@Override
	public Optional<User> findById(Long id) {
		return repository.findById(id);
		
	}


	@Override
	public Boolean doesUserExist(String username) {
		Optional<User>user=repository.findByUsername(username);
		if(user.isPresent())return true;
		return false;
	}

	@Override
	public User findByUsername(String username) {
		return repository.findByUsername(username).orElse(null);	
	}

	@Override
	public void save(User u) {
		repository.save(u);
	}

	





}

package com.examedge.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examedge.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	public Optional<User> findByUsername(String username);

	public void deleteById(Long id);

	public void deleteByUsername(String username);

	public Optional<User> findById(Long id);

}

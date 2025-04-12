package com.examedge.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examedge.entity.ForgotPassword;

@Repository
public interface ForgotPasswordRepo extends JpaRepository<ForgotPassword, String> {

	void deleteByEmail(String email);
	Optional <ForgotPassword> findByEmail(String email);
	Optional<ForgotPassword> findByOtpAndEmail(Integer otp, String email);
}

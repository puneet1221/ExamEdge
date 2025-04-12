package com.examedge.controllers;

import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examedge.dto.ChangePassword;
import com.examedge.dto.MailBody;
import com.examedge.entity.ForgotPassword;
import com.examedge.entity.User;
import com.examedge.repo.ForgotPasswordRepo;
import com.examedge.repo.UserRepository;
import com.examedge.service.EmailService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {
	@Autowired
	private UserRepository repository;

	@Autowired
	private EmailService emailService;

	@Autowired
	BCryptPasswordEncoder encoder;

	@Autowired
	private ForgotPasswordRepo forgotPasswordRepo;

	private Logger logger = LoggerFactory.getLogger(getClass());

	@PostMapping("/send-mail/{email}")
	@Transactional
	public ResponseEntity<String> verifyEmail(@PathVariable String email) {
		logger.error("teste");

		int otp = otpGenerator();
		forgotPasswordRepo.deleteByEmail(email);
		MailBody body = new MailBody(email, "OTP-FOR Password reset", "below is your otp\n\n\n\n" + otp + "");
		ForgotPassword forgotPassword = new ForgotPassword();
		forgotPassword.setOtp(otp);
		forgotPassword.setExpirationTime(new Date(System.currentTimeMillis() + 5 * 60 * 1000));
		forgotPassword.setEmail(email);

		logger.error("testing" + email);

		forgotPasswordRepo.save(forgotPassword);
		emailService.sendSimpleMessage(body);
		return ResponseEntity.ok("otp Send For Verification");

	}

	@PostMapping("/verify-otp/{otp}/{email}")
	public ResponseEntity<Map<String, String>> verifyOTP(@PathVariable String otp, @PathVariable String email) {
	    logger.info("Verifying OTP for email: {}", email);

	    Map<String, String> response = new HashMap<>();

	    // Check if the OTP and email exist in the database
	    Optional<ForgotPassword> forgotPasswordOptional = forgotPasswordRepo.findByOtpAndEmail(Integer.parseInt(otp), email);
	    
	    if (forgotPasswordOptional.isPresent()) {
	        ForgotPassword forgotPassword = forgotPasswordOptional.get();
	        
	        // Check if the OTP has expired
	        if (forgotPassword.getExpirationTime().before(Date.from(Instant.now()))) {
	            logger.warn("OTP expired for email: {}", email);
	            // Deleting OTP as it's expired
	            forgotPasswordRepo.deleteByEmail(email);

	            response.put("status", "error");
	            response.put("message", "OTP has expired. Please request a new one.");
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // 400 Bad Request
	        }

	        // OTP is valid and not expired
	        response.put("status", "success");
	        response.put("message", "OTP verified successfully.");
	        return ResponseEntity.ok(response); // 200 OK
	    } else {
	        logger.warn("Invalid OTP or email mismatch for email: {}", email);

	        response.put("status", "error");
	        response.put("message", "Invalid OTP. Please try again.");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response); // 400 Bad Request
	    }
	}


	// genrating otp
	private Integer otpGenerator() {
		Random random = new Random();
		return random.nextInt(100000, 999999);
	}

	// for changing password
	@PostMapping("/change-password/{email}")
	@Transactional
	public ResponseEntity<String> handleChangePassword(@RequestBody ChangePassword changePassword,
			@PathVariable String email) {

		if (!changePassword.password().equals(changePassword.repassword())) {
			logger.error("mismatcjh");
			return new ResponseEntity<String>("Password mismatch", HttpStatus.BAD_REQUEST);
		}

		String encodedPassword = encoder.encode(changePassword.password());
		Optional<User> u = repository.findByUsername(email);
		if (u.isPresent()) {
			User user = u.get();
			user.setPassword(encodedPassword);
			repository.save(user);
			return new ResponseEntity<String>("pass changed successfully", HttpStatus.OK);
		}
		return new ResponseEntity<String>("failed to change try again later", HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@PostMapping("/test")
	public String test() {
		return "tested";
	}

}

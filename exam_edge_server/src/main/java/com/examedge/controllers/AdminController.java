package com.examedge.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examedge.entity.Notifications;
import com.examedge.entity.Role;
import com.examedge.entity.User;
import com.examedge.entity.securitModels.JWTRequest;
import com.examedge.payments.PaymentDetailsRepo;
import com.examedge.repo.NotificationsRepo;
import com.examedge.repo.RoleRepository;
import com.examedge.service.UserService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	@Autowired
	private UserService service;

	@Autowired
	private NotificationsRepo notificationsRepo;

	@Autowired
	private RoleRepository repository;

	@Autowired
	private PaymentDetailsRepo paymentDetailsRepo;

	@PostMapping("/create-admin")
	public ResponseEntity<?> testing(@RequestBody JWTRequest jwtRequest) {
		Role ADMIN = repository.findByRole_name("ADMIN").get();
		User user = new User();
		user.setUsername(jwtRequest.getUsername());
		user.setPassword(passwordEncoder.encode(jwtRequest.getPassword()));
		return new ResponseEntity<User>(service.createUser(user, ADMIN), HttpStatus.CREATED);

	}

	@DeleteMapping("/delete-user/{username}")
	@Transactional
	public ResponseEntity<?> deleteUser(@PathVariable String username) {
		service.deleteUser(username);
		return ResponseEntity.ok(HttpStatus.OK);
	}

	@GetMapping("/test")
	public String test() {
		return "ok tested";
	}

	@PostMapping("/sendNotifications")
	public ResponseEntity<?> handleSendNotifications(@RequestBody Notifications notification) {
		notificationsRepo.save(notification);
		return new ResponseEntity<>("sent successfully ", HttpStatus.OK);
	}

	@GetMapping("/users-payment-details")
	public ResponseEntity<?> handleGetPaymentDetails() {
		return new ResponseEntity<>(paymentDetailsRepo.findAll(), HttpStatus.OK);
	}
}

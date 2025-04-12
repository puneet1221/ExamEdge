package com.examedge.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.examedge.entity.Notifications;
import com.examedge.entity.Role;
import com.examedge.entity.User;
import com.examedge.entity.UserReview;
import com.examedge.entity.securitModels.JWTRequest;
import com.examedge.repo.NotificationsRepo;
import com.examedge.repo.ReviewRepo;
import com.examedge.repo.RoleRepository;
import com.examedge.service.UserService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService service;
	@Autowired
	private RoleRepository repository;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private TokenGenerateService acnt;

	@Autowired
	private ReviewRepo reviewRepo;

	@Autowired
	private NotificationsRepo notificationsRepo;

	@Value("${upload.dir}")
	private String UPLOAD_DIR;

	@PostMapping("/")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		User existingUser = service.findByUsername(user.getUsername());
		if (existingUser != null)
			return new ResponseEntity<String>("ALREADY EXISTS", HttpStatus.OK);

		Role userRole = repository.findByRole_name("USER").orElse(null);
		if (user.getRole() == null) {
			if (userRole == null) {
				userRole = new Role();
				userRole.setId(10L);
				userRole.setRole_name("USER");
			}
			user.setRole(userRole);
		}
		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		service.createUser(user, userRole);
		return new ResponseEntity<String>("user register successfully", HttpStatus.CREATED);
	}

	@GetMapping("/findUser")
	public Boolean findUser(@RequestParam String email) {
		return service.doesUserExist(email);
	}

	@PostMapping("/login")
	public ResponseEntity<?> handleLoginRequest(@RequestBody JWTRequest jwtRequest) {
		// STEP 1: CHECK IF USER EXIST;
		if (!findUser(jwtRequest.getUsername())) {
			return new ResponseEntity<String>("invalid credentails", HttpStatus.OK);

		}
		// step2 authenticate and generate token byy acnt
		String token = null;
		try {
			token = acnt.generateToken(jwtRequest);
		} catch (Exception e) {
			return new ResponseEntity<String>("invalid credentails", HttpStatus.OK);
		}
		// step:3 return useDetails along with token
		User u = service.findByUsername(jwtRequest.getUsername());
		u.setToken(token);
		return new ResponseEntity<User>(u, HttpStatus.ACCEPTED);

	}

	@PutMapping("/updatePassword")
	@Transactional
	public ResponseEntity<?> handleUpdatePassword(@RequestBody JWTRequest jwtRequest) {
		User u = service.findByUsername(jwtRequest.getUsername());
		u.setPassword(bCryptPasswordEncoder.encode(jwtRequest.getPassword()));
		service.save(u);
		return new ResponseEntity<>("updated", HttpStatus.OK);
	}

	@Transactional
	@PostMapping("/updateProfile")
	public ResponseEntity<?> handleUpdateProfile(@RequestParam String username, @RequestParam String fname,
			@RequestParam String lname, @RequestParam String phone,
			@RequestParam(required = false) MultipartFile profile, @RequestHeader String token,
			@RequestParam boolean isProfileUpdated) {

		// Fetch user by username
		User user = service.findByUsername(username);
		user.setFname(fname);
		user.setLname(lname);
		user.setPhone(phone);
		user.setIsProfileUpdated(isProfileUpdated);

		// If profile picture is uploaded
		if (profile != null && !profile.isEmpty()) {
			try {
				// Generate a unique filename for the image
				String fileName = profile.getOriginalFilename();

				// Define the path to save the image
				Path path = Paths.get(UPLOAD_DIR, fileName);

				// Ensure that the directory exists
				Files.createDirectories(path.getParent());

				// Save the file to disk
				Files.write(path, profile.getBytes());

				// Save the relative path of the image in the database
				String imageUrl = "/images/profiles/" + fileName;
				user.setProfile(imageUrl); // Assuming User has a setProfileImageUrl method

				// Save the updated user

				service.save(user);
				user.setToken(token);
				return new ResponseEntity<User>(user, HttpStatus.OK);
			} catch (IOException e) {
				e.printStackTrace();
				return new ResponseEntity<>("failed to upload", HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		user.setToken(token);
		// If no profile picture is uploaded, just update the other details dont forget
		// to sent the toke back
		service.save(user);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@GetMapping("getNotifications")
	public ResponseEntity<Page<Notifications>> getNotifications(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {

		Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("id")));
		Page<Notifications> notifications = notificationsRepo.findAllNotifications(pageable);

		return ResponseEntity.ok(notifications);
	}

	@PostMapping("/review")
	public ResponseEntity<?> handleReviewSubmission(@RequestBody UserReview userReview, @RequestParam String username) {
		User u = service.findByUsername(username);
		userReview.setUser(u);
		reviewRepo.save(userReview);
		return new ResponseEntity<>("CREATED", HttpStatus.CREATED);

	}
}

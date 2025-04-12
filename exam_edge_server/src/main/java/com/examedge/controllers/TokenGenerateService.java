package com.examedge.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RestController;

import com.examedge.entity.securitModels.JWTRequest;
import com.examedge.entity.securitModels.JwtUtils;

@RestController
public class TokenGenerateService {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private JwtUtils jwtUtils;

	public void authenticate(String username, String password) {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
	}

	public String generateToken(JWTRequest jwtRequest) {

		authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());

		// authenticayte
		UserDetails userdetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		String token = jwtUtils.generateToken(userdetails.getUsername());
		return token;
	}

}

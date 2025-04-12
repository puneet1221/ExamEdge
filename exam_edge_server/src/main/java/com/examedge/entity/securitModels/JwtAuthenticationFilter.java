package com.examedge.entity.securitModels;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.examedge.service.impl.UserDetailsServiceImpl;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private UserDetailsServiceImpl detailsServiceImpl;

	@Autowired
	private JwtUtils jwtutil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String requestTokenHeader = request.getHeader("Authorization");
		System.out.println(requestTokenHeader);
		String username = null;
		if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
			requestTokenHeader = requestTokenHeader.substring(7);

			try {
				username = jwtutil.extractUsername(requestTokenHeader);
			} catch (ExpiredJwtException e) {
				System.err.println("Exception in JWTAuthenticationfILTER KHOL K DEKH LO WO WALI FILE");

			} catch (Exception e) {
				System.err.println("Exception in JWTAuthenticationfILTER"+e.getMessage());
			}
		} else {
			
		}

		// validate now
		//checking if user isnot authenticatied and username isnot null
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
			//load the user detai;s
			final UserDetails u = detailsServiceImpl.loadUserByUsername(username);
			
			//validate the token
			if (jwtutil.validateToken(requestTokenHeader, u.getUsername())) {
				
				//create the toekn && storing in security context
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(u,
						null, u.getAuthorities());
				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			} else {
//			System.err.println("token isnt valid");
			}

		}
		//to pass the request to next filter or to controller

		filterChain.doFilter(request, response);

	}

}

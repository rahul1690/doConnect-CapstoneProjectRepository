package com.doconnect.qanda.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.doconnect.qanda.config.JwtUtil;
import com.doconnect.qanda.entity.User;
import com.doconnect.qanda.exceptions.UsernameNotFoundException;
import com.doconnect.qanda.model.AuthenticationResponse;
import com.doconnect.qanda.model.LoginDto;
import com.doconnect.qanda.serviceImpl.UserServiceImpl;

@RestController
@CrossOrigin(origins = "*")
public class AuthenticateController {

	@Autowired
	UserServiceImpl userService;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@Autowired
	JwtUtil jwtUtil;
	
	@PostMapping("/register")
	public User register(@RequestBody User user) {
		user.setRoles("ROLE_USER");
		return userService.addUser(user);
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody LoginDto loginDto) throws UsernameNotFoundException {

			Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword()));
			if(auth == null) {
				throw new UsernameNotFoundException("Username Not Found!");
			}
			
			final UserDetails userDetails =  userDetailsService.loadUserByUsername(loginDto.getUsername());
			
			final String token = jwtUtil.generateToken(userDetails);
			
			System.out.println(token);
			
			return ResponseEntity.ok(new AuthenticationResponse(token));
		
	}
	
	
	@GetMapping("/getUserDetails")
	public User getUserDetails() {
		return userService.getUserDetails();
	}
	
}

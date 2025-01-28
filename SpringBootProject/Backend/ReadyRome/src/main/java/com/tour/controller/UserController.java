package com.tour.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tour.dto.AdminDTO;
import com.tour.dto.ApiResponse;
import com.tour.dto.AuthRequest;
import com.tour.dto.BookingDTO;
import com.tour.dto.PackageDTO;
import com.tour.dto.UserRespDTO;
import com.tour.entities.User;
import com.tour.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
	
	@Autowired 
	private UserService userService;

	public UserController() {
		System.out.println("in ctor : " + getClass());
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody @Valid AuthRequest dto) {
		System.out.println("in user auth " + dto);
		UserRespDTO respDTO = userService.authenticate(dto);
		return ResponseEntity.ok(respDTO);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?>  addNewUser(@RequestBody  UserRespDTO dto){
		User respDTO = userService.RegisterUser(dto);
		return ResponseEntity.ok(respDTO);		
	}

	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/addbookings")
	public ResponseEntity<?> addBookings(@RequestBody BookingDTO myBooking) {
		System.out.println(myBooking);
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(userService.addNewBooking(myBooking));
		} catch (RuntimeException e) {
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST) 
					.body(new ApiResponse(e.getMessage()));
		}
	}
}
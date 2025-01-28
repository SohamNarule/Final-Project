package com.tour.service;

import com.tour.dto.ApiResponse;
import com.tour.dto.AuthRequest;
import com.tour.dto.BookingDTO;
import com.tour.dto.UserRespDTO;
import com.tour.entities.User;

public interface UserService {
	UserRespDTO authenticate(AuthRequest dto);
	public User RegisterUser(UserRespDTO user);
	ApiResponse addNewBooking(BookingDTO myBooking);
}

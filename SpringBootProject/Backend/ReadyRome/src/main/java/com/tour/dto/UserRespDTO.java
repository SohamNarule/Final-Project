package com.tour.dto;

import com.tour.entities.userRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRespDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Integer role ;
}

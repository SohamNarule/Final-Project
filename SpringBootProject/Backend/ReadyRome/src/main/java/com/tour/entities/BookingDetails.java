package com.tour.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(callSuper = true, exclude = {"user", "Mypackage","cart"})
public class BookingDetails extends BaseEntity {

	@NotNull
	private String name;
	@NotNull
	private String address;
	@NotNull
	private Integer age;
	@NotNull	
	private String addharNo;
	private String passportNo;
	@NotNull
	private String contactNo;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="pkgId")
	private MyPackage myPackage;
	
}




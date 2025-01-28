package com.tour.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(callSuper = true, exclude = {"bookingDetails","cart"})

public class User extends BaseEntity {

	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private Integer role = 0;
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
		private List<BookingDetails> bookingDetails =new ArrayList<>();
	
//@OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
//private List<Cart> carts=new ArrayList<>();	

	public void addBookingDetails(BookingDetails bd) {
		this. bookingDetails.add(bd);
		bd.setUser(this);
	}

	public void removeBookingDetails(BookingDetails bd) {
		this.bookingDetails.remove(bd);
		bd.setUser(null);
	}
}

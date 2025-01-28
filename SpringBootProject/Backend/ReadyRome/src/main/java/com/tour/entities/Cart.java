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
//@NoArgsConstructor
//@AllArgsConstructor
@ToString(callSuper = true, exclude = {"bookingDetails", "packages","users"})
public class Cart extends BaseEntity {

//	@ManyToOne
//	@JoinColumn(name="user_id")
//	private User user;


//	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
//	List<BookingDetails> bookingDetails = new ArrayList<>();
//
//	public void addBookingDetails(BookingDetails bd) {
//		this.bookingDetails.add(bd);
//		bd.setCart(this);
//	}
//
//	public void removeBookingDetails(BookingDetails bd) {
//		this.bookingDetails.remove(bd);
//		bd.setCart(null);
//	}
}

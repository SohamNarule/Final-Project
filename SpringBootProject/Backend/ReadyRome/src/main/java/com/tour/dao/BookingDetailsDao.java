package com.tour.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.entities.BookingDetails;



public interface BookingDetailsDao extends JpaRepository<BookingDetails, Long> {

}
package com.tour.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.entities.Cart;


public interface CartDao extends JpaRepository<Cart, Long> {

}
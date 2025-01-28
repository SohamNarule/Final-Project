package com.tour.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.entities.User;

public interface UserDao extends JpaRepository<User, Long> {
	 Optional<User> findByEmail(String email);
}


package com.tour.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tour.entities.Country;



public interface CountryDao extends JpaRepository<Country, Long> {

}
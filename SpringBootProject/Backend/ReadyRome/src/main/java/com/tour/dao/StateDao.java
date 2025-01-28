package com.tour.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tour.dto.StateWithCountryDTO;
import com.tour.entities.States;

public interface StateDao extends JpaRepository<States, Long> {
	List<States> findByCountryId(Long countryId);
    @Query("SELECT new com.tour.dto.StateWithCountryDTO(s.state_name, c.country_name) " +
            "FROM States s JOIN s.country c")
     List<StateWithCountryDTO> findAllStatesWithCountryName();   
}
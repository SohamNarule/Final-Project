package com.tour.service;

import java.util.List;

import com.tour.dto.ApiResponse;
import com.tour.dto.StateDTO;
import com.tour.dto.StateDTO2;
import com.tour.dto.StateWithCountryDTO;
import com.tour.entities.States;

public interface StateService {
	public List<StateDTO2> getAllStates(Long countryId);
	ApiResponse addNewState(StateDTO dto);
	List<StateWithCountryDTO> getAllStatesWithCountry();
}

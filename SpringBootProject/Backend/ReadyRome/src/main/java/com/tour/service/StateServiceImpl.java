package com.tour.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tour.custom_exceptions.ResourceNotFoundException;
import com.tour.dao.CountryDao;
import com.tour.dao.PackageDao;
import com.tour.dao.StateDao;
import com.tour.dto.ApiResponse;
import com.tour.dto.StateDTO;
import com.tour.dto.StateDTO2;
import com.tour.dto.StateWithCountryDTO;
import com.tour.entities.Country;
import com.tour.entities.States;

@Service
@Transactional
public class StateServiceImpl implements StateService {

	@Autowired
	private StateDao stateDao;

	@Autowired
	private CountryDao countryDao;

	@Autowired
	private PackageDao pkgDao;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public ApiResponse addNewState(StateDTO dto) {
	
		Country country = countryDao.findById(dto.getCountryId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Country ID !!!"));
		States stateEntity = new States();
		stateEntity.setState_name(dto.getStateName()); 
		stateEntity.setCountry(country); 
		stateDao.save(stateEntity);

		return new ApiResponse("Added new State!");
	}
	
	public List<StateDTO2> getAllStates(Long countryId) {	   
	    List<States> states = stateDao.findByCountryId(countryId);
	    List<StateDTO2> stateDTOs = states.stream()
	            .map(state -> {
	          
	                StateDTO2 dto = new StateDTO2();
	                dto.setCountryId(countryId); 
	                dto.setStateName( state.getState_name()); 
	                dto.setStateId(state.getId());	               
	                return dto;
	            })
	            .collect(Collectors.toList());

	    return stateDTOs; 
	}

	  public List<StateWithCountryDTO> getAllStatesWithCountry() {
	        return stateDao.findAllStatesWithCountryName();
	    }
	
}

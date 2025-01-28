package com.tour.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tour.dto.ApiResponse;
import com.tour.dto.CountryRespDTO;
import com.tour.dto.StateDTO;
import com.tour.dto.StateDTO2;
import com.tour.dto.StateWithCountryDTO;
import com.tour.entities.States;
import com.tour.service.StateService;


@RestController
@RequestMapping("/states")
@CrossOrigin
public class StateController {
	@Autowired
	private StateService stateService;
	
	public StateController() {
		System.out.println("in ctor " + getClass());
	}
	
	@PostMapping("/addstate")
	public ResponseEntity<?> addState(@RequestBody StateDTO dto)
	{
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(stateService.addNewState(dto));
		} catch (RuntimeException e) {
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST) 
					.body(new ApiResponse(e.getMessage()));
		}
	}
	@CrossOrigin
	@GetMapping("/{countryId}")
	public ResponseEntity<?> getStates(@PathVariable Long countryId) {
		List<StateDTO2>states = stateService.getAllStates(countryId);
				if (states.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		return ResponseEntity.status(HttpStatus.OK).body(states);
	}
	
	@CrossOrigin
	@GetMapping("/allstates")
	    public List<StateWithCountryDTO> getAllStatesWithCountry() {
		
	        return stateService.getAllStatesWithCountry();
	    }	
}



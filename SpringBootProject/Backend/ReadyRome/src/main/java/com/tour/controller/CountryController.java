package com.tour.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tour.dto.ApiResponse;
import com.tour.dto.CountryRespDTO;
import com.tour.entities.Country;
import com.tour.service.CountryService;

import jakarta.validation.Valid;

@RestController 
@RequestMapping("/countries")
@Validated
@CrossOrigin(origins="http://localhost:5173")
public class CountryController {
@Autowired
private CountryService countryService;

public CountryController() {
	System.out.println("in ctor " + getClass());
}

@GetMapping
public ResponseEntity<?> getCountriess() {
	List<CountryRespDTO> countries = countryService.getAllCountries();
	if (countries.isEmpty())
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	return ResponseEntity.status(HttpStatus.OK).body(countries);
}

@PostMapping("/addcountry")
public ResponseEntity<?> addNewCountry( @RequestBody Country country) {
	System.out.println(country.getCountry_name());
	return ResponseEntity.status(HttpStatus.CREATED) 
			.body(new ApiResponse(countryService.addNewCountry(country)));
}

@DeleteMapping("/delete/{countryId}")
public ResponseEntity<?> deleteCountryDetails(@PathVariable Long countryId) {
	return ResponseEntity.ok(countryService.deleteCountry(countryId));

}



}

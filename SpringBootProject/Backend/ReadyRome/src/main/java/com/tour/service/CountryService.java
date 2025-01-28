package com.tour.service;

import java.util.List;

import com.tour.dto.ApiResponse;
import com.tour.dto.CountryRespDTO;
import com.tour.entities.Country;

import jakarta.validation.Valid;




public interface CountryService {
	List<CountryRespDTO> getAllCountries();
	String addNewCountry( Country country);
	ApiResponse deleteCountry(Long countryId);
}

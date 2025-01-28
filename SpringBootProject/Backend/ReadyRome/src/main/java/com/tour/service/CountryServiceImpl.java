package com.tour.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tour.custom_exceptions.ResourceNotFoundException;
import com.tour.dao.CountryDao;
import com.tour.dto.ApiResponse;
import com.tour.dto.CountryRespDTO;
import com.tour.entities.Country;


@Service
@Transactional
public class CountryServiceImpl implements CountryService {
@Autowired
private CountryDao countryDao;
@Autowired 
private ModelMapper modelMapper;
	@Override
	public List<CountryRespDTO> getAllCountries() {

		 return countryDao.findAll()
				.stream() 
				.map(country-> modelMapper.map(country,CountryRespDTO.class)) 
				.collect(Collectors.toList());
	}

	@Override
	public String addNewCountry(Country newCountry) {
		System.out.println(newCountry.getCountry_name());
		Country persistentCountry= countryDao.save(newCountry);
		return "Added new Country with ID="+persistentCountry.getId();
	}

	@Override
	public ApiResponse deleteCountry(Long countryId) {
		if(countryDao.existsById(countryId)) {
			countryDao.deleteById(countryId);
			return new ApiResponse("Deleted country details !");
		}
		throw new ResourceNotFoundException("Invalid Country ID !!!!!");
	}

}

package com.tour.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StateWithCountryDTO {
	private String stateName;
    private String countryName;

    public StateWithCountryDTO(String stateName, String countryName) {
        this.stateName = stateName;
        this.countryName = countryName;
    }
}

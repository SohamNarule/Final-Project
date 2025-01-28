package com.tour.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
//@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PackageDTO {

	private String SmallDescription ; 
	private Double price ;
	private Long stateId;
	private String nameOfPackage ;
	private String image ;
	private String BigDiscription;
	private String tagLine;
	private String duration;	
}

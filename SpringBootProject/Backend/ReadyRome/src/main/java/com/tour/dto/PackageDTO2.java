package com.tour.dto;

import com.tour.entities.States;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PackageDTO2 {

	private String SmallDescription ; 
	private Double price ;
	private Long stateId;
	private String nameOfPackage ;
	private String image ;
	private String BigDiscription;
	private String tagLine;
	private String duration;	
	private Long packageId;
}

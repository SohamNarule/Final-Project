package com.tour.service;

import java.util.List;

import com.tour.dto.ApiResponse;
import com.tour.dto.PackageDTO;
import com.tour.dto.PackageDTO2;
import com.tour.dto.StateDTO;
import com.tour.entities.MyPackage;

public interface PackageService {

	
	List<PackageDTO> getAllpackage() ;
	//String addNewPackage(MyPackage newPackage) ;
	ApiResponse deletePackage(Long packageId) ;
	ApiResponse addNewPackage(PackageDTO dto);
	PackageDTO getSinglePackageDetail(Long packageId) ;
	ApiResponse updatePackage(Long packageId , MyPackage newPackage) ;
	public List<PackageDTO2> getAllPackages(Long stateId);
	List<PackageDTO2> getAllPackagesDetail(Long id);

}

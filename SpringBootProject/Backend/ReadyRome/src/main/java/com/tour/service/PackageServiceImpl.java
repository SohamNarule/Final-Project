package com.tour.service;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tour.custom_exceptions.ResourceNotFoundException;
import com.tour.dao.PackageDao;
import com.tour.dao.StateDao;
import com.tour.dto.ApiResponse;
import com.tour.dto.PackageDTO;
import com.tour.dto.PackageDTO2;
import com.tour.dto.StateDTO;
import com.tour.entities.MyPackage;
import com.tour.entities.States;

import jakarta.transaction.Transactional;
@Service
@Transactional
public class PackageServiceImpl implements PackageService{
	@Autowired
	private PackageDao packageDao ;
	
	@Autowired
	private StateDao stateDao;
	
    @Autowired
	private ModelMapper modelMapper ;
	@Override
	public List<PackageDTO> getAllpackage() {
	    try {
	        List<MyPackage> packages = packageDao.findAll();
	        if (packages == null) {
	            return new ArrayList<>(); // or throw a custom exception
	        }
	        
	        return packages.stream()
	                .map(pkg -> modelMapper.map(pkg, PackageDTO.class))
	                
	                .collect(Collectors.toList());
	        
	    } catch (Exception e) {
	        // Log the exception
	        //logger.error("Error while fetching all packages", e);
	        throw new RuntimeException("Failed to retrieve packages", e);
	    }
	}
	


	@Override
	public ApiResponse deletePackage(Long packageId) {
		
		if(packageDao.existsById(packageId)) {
		packageDao.deleteById(packageId);
		return new ApiResponse("deleted package");
	}
		
		return new ApiResponse("failed in deleting package") ;
	}
	@Override
	public PackageDTO getSinglePackageDetail(Long packageId) {
	    MyPackage myPackage = packageDao.findById(packageId)
	            .orElseThrow(() -> new ResourceNotFoundException("Invalid package id"));
	    
	    // Create a DTO to map MyPackage to PackageDTO
	    PackageDTO packageDTO = modelMapper.map(myPackage, PackageDTO.class);

	    // Check if the package has an image, and if so, convert it to Base64
	    if (myPackage.getImage() != null) {
	        String base64Image = Base64.getEncoder().encodeToString(myPackage.getImage());
	        packageDTO.setImage(base64Image);  // Set the Base64-encoded image in the DTO
	    }

	    return packageDTO;
	}
	@Override
	public ApiResponse updatePackage(Long packageId, MyPackage newPackage) {
		
		if(packageDao.existsById(packageId)) {
			
			System.out.println(packageId) ;
			newPackage.setId(packageId) ;
			
			MyPackage persistancePackage = packageDao.save(newPackage) ;
			return new ApiResponse("updated package") ;
		}
		
		return new ApiResponse("package not updated") ;
	}
	@Override
	public ApiResponse addNewPackage(PackageDTO dto) {
        try {
            // Convert Base64 string to byte array (image data)
            byte[] imageBytes = Base64.getDecoder().decode(dto.getImage());

            // Get the state entity
            States state = stateDao.findById(dto.getStateId())
                .orElseThrow(() -> new ResourceNotFoundException("Invalid State ID"));

            // Create the package entity and set its fields
            MyPackage myPackage = new MyPackage();
            myPackage.setNameOfPackage(dto.getNameOfPackage());
            myPackage.setPrice(dto.getPrice());
            myPackage.setDuration(dto.getDuration());
            myPackage.setTagLine(dto.getTagLine());
            myPackage.setBigDescription(dto.getBigDiscription());
            myPackage.setSmallDescription(dto.getSmallDescription());
            myPackage.setState(state);
            myPackage.setImage(imageBytes);  // Store image as byte[]

            // Save the package to the database
            packageDao.save(myPackage);

            return new ApiResponse("Package added successfully!");
        } catch (Exception e) {
            throw new RuntimeException("Error uploading package", e);
        }
    }
	
	
	
	
	@Override
	public List<PackageDTO2> getAllPackages(Long stateId) {
	    // Fetch the packages from the database using the stateId
	    List<MyPackage> pkgs = packageDao.findByStateId(stateId);
	    
	    // Convert MyPackage entities to PackageDTO2
	    List<PackageDTO2> pkgsDTOs = pkgs.stream()
	        .map(pkg -> {
	            PackageDTO2 dto = new PackageDTO2();
	            dto.setStateId(stateId);
	            dto.setNameOfPackage(pkg.getNameOfPackage());
	            dto.setSmallDescription(pkg.getSmallDescription());
	            
	            // Check if the package has an image, and if so, set it
	            if (pkg.getImage() != null) {
	                // Convert byte[] to Base64 string and set it
	                String base64Image = Base64.getEncoder().encodeToString(pkg.getImage());
	                dto.setImage(base64Image); // Now the image is in Base64 string format
	            }
	            
	            dto.setPrice(pkg.getPrice());
	            dto.setTagLine(pkg.getTagLine());
	            dto.setBigDiscription(pkg.getBigDescription());
	            dto.setDuration(pkg.getDuration());
	            dto.setPackageId(pkg.getId());
	            
	            return dto;
	        })
	        .collect(Collectors.toList());

	    return pkgsDTOs;
	}

	@Override
	public List<PackageDTO2> getAllPackagesDetail(Long id) {
	    // Fetch the package details using the package ID
	    List<MyPackage> pkgs = packageDao.findPackageById(id);
	    
	    // Convert MyPackage entities to PackageDTO2
	    List<PackageDTO2> pkgsDTOs = pkgs.stream()
	        .map(pkg -> {
	            PackageDTO2 dto = new PackageDTO2();
	            dto.setNameOfPackage(pkg.getNameOfPackage());
	            dto.setSmallDescription(pkg.getSmallDescription());
	            
	            // Check if the package has an image, and if so, convert it to Base64 string
	            if (pkg.getImage() != null) {
	                // Convert byte[] to Base64 string and set it
	                String base64Image = Base64.getEncoder().encodeToString(pkg.getImage());
	                dto.setImage(base64Image); // Now the image is in Base64 string format
	            }
	            
	            dto.setPrice(pkg.getPrice());
	            dto.setTagLine(pkg.getTagLine());
	            dto.setBigDiscription(pkg.getBigDescription());
	            dto.setDuration(pkg.getDuration());
	            dto.setPackageId(id); // Assuming the ID is the same as in the method argument
	            
	            return dto;
	        })
	        .collect(Collectors.toList());

	    return pkgsDTOs;
	}





}
package com.tour.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tour.dto.ApiResponse;
import com.tour.dto.PackageDTO;
import com.tour.dto.PackageDTO2;
import com.tour.dto.StateDTO;
import com.tour.entities.MyPackage;
import com.tour.service.PackageService;



@RestController


@RequestMapping("/package")
@CrossOrigin(origins = "http://localhost:5173")
public class PackageControler {

	@Autowired
	
	private PackageService packageService ;
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/allPackages")
	public ResponseEntity<?> getAllPackages() {
		
		System.out.println("getAllPackages") ;
	List<PackageDTO> packageDto = packageService.getAllpackage() ;
		
	if(packageDto.isEmpty()) {
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build() ;
	}
	
	return ResponseEntity.status(HttpStatus.OK).body(packageDto) ;
	
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PostMapping("/addPackage")
	public ResponseEntity<?> addPackage(@RequestBody PackageDTO myPackage) {
		System.out.println(myPackage.getBigDiscription());
		System.out.println(myPackage.getSmallDescription());
		System.out.println(myPackage.getNameOfPackage());
		System.out.println(myPackage.getImage());
		System.out.println("hello");
		System.out.println(myPackage);
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(packageService.addNewPackage(myPackage));
		} catch (RuntimeException e) {
			return ResponseEntity
					.status(HttpStatus.BAD_REQUEST) 
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@DeleteMapping("/delete/{id}")
	
	public ResponseEntity<?> deletePackage(@PathVariable Long id) {
		return ResponseEntity.ok(packageService.deletePackage(id));
	}
	
	@GetMapping("/{stateId}")
	public ResponseEntity<?> getPackageById(@PathVariable Long stateId) {
		List<PackageDTO2>pkgs = packageService.getAllPackages(stateId);
		if (pkgs.isEmpty())
	return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
return ResponseEntity.status(HttpStatus.OK).body(pkgs);
	}	
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<?> getPackageDetailById(@PathVariable Long id) {
		List<PackageDTO2>pkgs = packageService.getAllPackagesDetail(id);
		if (pkgs.isEmpty())
	return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
return ResponseEntity.status(HttpStatus.OK).body(pkgs);
	}
}

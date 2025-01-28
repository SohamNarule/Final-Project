package com.tour.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tour.entities.MyPackage;
import com.tour.entities.States;


public interface PackageDao extends JpaRepository<MyPackage, Long> {
	List<MyPackage> findByStateId(Long stateId);
	 
	@Query("SELECT m FROM MyPackage m WHERE m.id = :id")
	List<MyPackage>  findPackageById(@Param("id") Long id);
}
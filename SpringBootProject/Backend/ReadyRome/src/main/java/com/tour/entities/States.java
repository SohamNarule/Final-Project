package com.tour.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "States")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true, exclude = {"country", "packages"})
public class States extends BaseEntity {
@Column(length = 70, nullable = false, unique = true)
private String state_name;

@ManyToOne
@JoinColumn(name = "country_id",nullable = false)
private Country country;

@OneToMany(mappedBy= "state", cascade= CascadeType.ALL, orphanRemoval= true)
private List<MyPackage> myPackages  = new ArrayList<>();

public States(String state_name) {
	super();
	this.state_name = state_name;
}

public void addPackages(MyPackage tourPackage) {
	this.myPackages.add(tourPackage);
	tourPackage.setState(this);
}

public void removePackages(MyPackage tourPackage) {
	this.myPackages.remove(tourPackage);
	tourPackage.setState(null);

}
}
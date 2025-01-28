package com.tour.entities;

import java.util.ArrayList;
import java.util.List;



import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Countries")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper= true, exclude= "states")
public class Country extends BaseEntity {
@Column(length= 50, nullable = false, unique = true)
private String country_name;

@OneToMany(mappedBy= "country", cascade= CascadeType.ALL, orphanRemoval= true)
private List<States> states = new ArrayList<>();

public Country(String country_name) {
	super();
	this.country_name = country_name;
}

public void addStates(States state) {
	this.states.add(state);
	state.setCountry(this);
}

public void removeStates(States state) {
	this.states.remove(state);
	state.setCountry(null);
}
	
}
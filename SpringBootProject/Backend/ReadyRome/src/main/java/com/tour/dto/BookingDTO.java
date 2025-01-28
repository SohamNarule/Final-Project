package com.tour.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
	private String email;  // Shared email for all people
    private List<Person> peopleDetails = new ArrayList<>(); 
    
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Person {
        private String name;
        private String address;
        private Integer age;
        private String addharNo;
        private String passportNo;
        private String contactNo;
        private Long packageId;
    }
}

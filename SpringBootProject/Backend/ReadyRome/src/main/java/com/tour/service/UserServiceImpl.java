package com.tour.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tour.custom_exceptions.ResourceNotFoundException;
import com.tour.dao.BookingDetailsDao;
import com.tour.dao.CartDao;
import com.tour.dao.PackageDao;
import com.tour.dao.UserDao;
import com.tour.dto.ApiResponse;
import com.tour.dto.AuthRequest;
import com.tour.dto.BookingDTO;
import com.tour.dto.UserRespDTO;
import com.tour.entities.BookingDetails;
import com.tour.entities.MyPackage;
import com.tour.entities.User;


@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private PackageDao pkgdao;

    @Autowired
    private ModelMapper mapper;
    @Autowired
    private BookingDetailsDao bdd;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserRespDTO authenticate(AuthRequest dto) {
        Optional<User> optional = userDao.findByEmail(  dto.getEmail());
        User userEntity = optional.orElseThrow(() -> new ResourceNotFoundException("Invalid email or password !!!!"));

        /*if (!passwordEncoder.matches(dto.getPassword(), userEntity.getPassword())) {
            throw new ResourceNotFoundException("Invalid email or password !!!!");
        }*/
        try {
        System.out.println("userEntity"+userEntity) ;
        if(userEntity.getRole() == 0 || userEntity.getRole() == 1 ) {
        	return mapper.map(userEntity, UserRespDTO.class);
        }else {
        	//return mapper.map(userEntity, UserRespDTO.class) ;
        	throw new RuntimeException("Not valid User");
        }
        }catch(RuntimeException exec) {
        	//return mapper.map(userEntity, UserRespDTO.class) ;
        	throw new RuntimeException("You are not admin");
        }
        //return mapper.map(userEntity, UserRespDTO.class) ;
            
       
    }

    @Override
    public User RegisterUser(UserRespDTO user) {
        if (userDao.findByEmail(user.getEmail()).isPresent()) {
            throw new ResourceNotFoundException("User Already Exists !!!");
        }

        User userEntity = mapper.map(user, User.class);
        userEntity.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.save(userEntity);
        return userEntity;
    }

	@Override
	public ApiResponse addNewBooking(BookingDTO dto) {
		 User user = userDao.findByEmail(dto.getEmail())
	                .orElseThrow(() -> new ResourceNotFoundException("User not found with the provided email: " + dto.getEmail()));


	        for (BookingDTO.Person person : dto.getPeopleDetails()) {
	        	
	            BookingDetails bookingDetails = new BookingDetails();
	            bookingDetails.setAddharNo(person.getAddharNo());
	            bookingDetails.setAddress(person.getAddress());
	            bookingDetails.setAge(person.getAge());
	            bookingDetails.setContactNo(person.getContactNo());
	            bookingDetails.setName(person.getName());
	            bookingDetails.setPassportNo(person.getPassportNo());
	            bookingDetails.setUser(user);
	            System.out.println("hello"+person.getPackageId());
	            if (person.getPackageId() != null) {
	                MyPackage myPackage = pkgdao.findById(person.getPackageId())  // Assuming you have myPackageDao
	                    .orElseThrow(() -> new ResourceNotFoundException("Package not found with the provided ID: " + person.getPackageId()));
	                bookingDetails.setMyPackage(myPackage);  // Set the MyPackage object
	            }
	            bdd.save(bookingDetails);
	        }
	        return new ApiResponse("Added new Booking(s)!");
}
	}


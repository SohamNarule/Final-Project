package com.tour.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import lombok.AllArgsConstructor;

@EnableWebSecurity // - required in earlier spring sec versions -enabled by default
@Configuration // equivalent to bean config xml file
//@AllArgsConstructor
public class SecurityConfig {	
	@Autowired
	private PasswordEncoder encoder;
	
  @Bean
  public UserDetailsService userDetailsService() {
	  //User class implements UserDetails i/f
	  //ctor: User(String userName, String pwd, Collection<GrantedAuthority>authorities
	 //Granted Authority i/f implements by SimpleGrantedAuthority
	  User admin1 = new User("Vaishnavi", encoder.encode("123456"), List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
	  User admin2 = new User("Soham", encoder.encode("23456"), List.of(new SimpleGrantedAuthority("ROLE_ADMIN")));
	  User user1  = new User("Dipesh", encoder.encode("3456"), 
			  List.of(new SimpleGrantedAuthority("ROLE_USER")));
	   
	  
	  
      return new InMemoryUserDetailsManager(admin1, admin2, user1);
      
  }
	
  // Configure the bean to customize spring security filter chain
	@Bean
	public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception
	{
		http.csrf(customizer -> customizer.disable()) //disabled CSRF attack
        .authorizeHttpRequests
        (request -> 
        request.requestMatchers("/countries", "/states","/states/allstates","/states/{countryId}",
        		"/users/signup","/users/signin",
				"/v*/api-doc*/**","/swagger-ui/**", "/users/addbookings","/countries/addcountry", "/countries/delete/{countryId}", "/states/addstate","/package/detail/{id}","/package/allPackages","/package/addPackage","/package/delete/{id}","/package/update/{id}","/package/{stateId}").permitAll()
        	
//       .requestMatchers("/products/purchase/**").hasRole("CUSTOMER")
       //.requestMatchers()
       //.hasRole("ADMIN")        		
        .anyRequest().authenticated())// any other req can be only accessible to authenticated users  
        .httpBasic(Customizer.withDefaults())
        .sessionManagement(session 
        		-> session.sessionCreationPolicy(
        				SessionCreationPolicy.STATELESS));
        return http.build();
	}
}

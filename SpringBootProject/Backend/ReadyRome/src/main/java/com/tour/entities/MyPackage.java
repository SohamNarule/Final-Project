package com.tour.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "tour_package")
@ToString(callSuper = true, exclude = {"state", "bookingDetails","cart"})

public class MyPackage extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "state_id", nullable = false)
    private States state;

    @OneToMany(mappedBy = "myPackage", cascade = CascadeType.ALL, orphanRemoval = true)
    List<BookingDetails> bookingDetails = new ArrayList<BookingDetails>();


    @Column(name = "package_name")
    private String nameOfPackage;

    @Column(name = "price")
    private Double price;

    @Column(name = "tagLine")
    private String tagLine;

    @Column(name = "small_Description",length=5000)
    private String SmallDescription;

    @Lob
    @Column(name = "big_Description",length=50000)
    private String BigDescription; 
    
    @Lob
    @Column(name = "image")
    private byte[] image;

    private String duration;
    public void addBookingDetails(BookingDetails bd) {
        this.bookingDetails.add(bd);
        bd.setMyPackage(this);
    }

    public void removeBookingDetails(BookingDetails bd) {
        this.bookingDetails.remove(bd);
        bd.setMyPackage(null);
    }
}

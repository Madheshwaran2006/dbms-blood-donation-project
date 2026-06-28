package com.mmy.projectdb.Respository;

import com.mmy.projectdb.models.donors;
import com.mmy.projectdb.models.users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DonorRepository extends MongoRepository<donors, String> {


    List<donors> findByBloodGroup(String bloodGroup);

    List<donors> findByLocation(String location);

    List<donors> findByBloodGroupAndLocation(String bloodGroup, String location);

    List<donors> findByAvailabilityStatus(boolean availabilityStatus);

}

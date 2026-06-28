package com.mmy.projectdb.Service;


import com.mmy.projectdb.Respository.DonorRepository;
import com.mmy.projectdb.Respository.dbrepo;

import com.mmy.projectdb.Respository.dbrequest;
import com.mmy.projectdb.Respository.donated_repo;
import com.mmy.projectdb.models.donated;
import com.mmy.projectdb.models.donors;
import com.mmy.projectdb.models.requester;
import com.mmy.projectdb.models.users;
import jakarta.mail.MessagingException;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class servicelayer {
    @Autowired
    dbrepo r;
    @Autowired
    DonorRepository dr;
    @Autowired
    dbrequest request;
    @Autowired
    private EmailService email;
    @Autowired
    private donated_repo drr;


    public void register(users u) {
        if(r.findByEmail(u.getemail()).isPresent())
            System.out.println("Already registered user");

        System.out.println("Registration is successful");
        r.save(u);
    }


        public Map<String, Object> login(String email, String password) {
            Optional<users> user = r.findByEmail(email);
            Map<String, Object> response = new HashMap<>();

            if (user.isPresent() && user.get().getPassword().equals(password)) {
                response.put("message", "Login Successful");
                response.put("user_id", user.get().getUser_id());
                response.put("username", user.get().getUsername());
                response.put("email", user.get().getemail());
            } else {
                response.put("message", "Invalid Login details");
                response.put("user_id", null);
            }
            System.out.println("Successfully Logged in");
            return response;

        }



        public void donor_registration(donors d, String userId) {

            users u = r.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));


            d.setUsername(u.getUsername());


            if (d.getDob() == null) {
                throw new IllegalArgumentException("Date of birth is mandatory");
            }
            int age = Period.between(d.getDob(), LocalDate.now()).getYears();
            if (age < 18) {
                throw new IllegalArgumentException("Donor must be at least 18 years old to register");
            }


            if (d.getLastDonationDate() != null) {
                Period p = Period.between(d.getLastDonationDate(), LocalDate.now());
                d.setAvailabilityStatus(p.getMonths() >= 3);
            } else {
                d.setAvailabilityStatus(true);
            }


            d.setCreatedAt(LocalDate.now());
            d.setUpdatedAt(LocalDate.now());


            dr.save(d);
            System.out.println("Donor is registered");
        }


    public void Request_details(requester r)
    {
        request.save(r);
        System.out.println("Request details are registered!!");
    }

    public List<donors> getdonorlist(String bloodgroup, String location)
    {

        List<donors> Donors = dr.findByBloodGroupAndLocation(bloodgroup,location);

        if (! Donors.isEmpty()){
            return Donors;
        }
        else{
            return dr.findByBloodGroup(bloodgroup);
        }

    }

    public void notify(requester r)  {
        List<donors> donor = dr.findByBloodGroupAndLocation(r.getBloodGroup(),r.getLocation());

        for(donors d:donor)
        {
            try{
                email.bloodrequestemail(d.getEmail(),d.getName(),r);
            }catch (Exception e)
            {
                e.printStackTrace();
            }
        }
        System.out.println("The donors"+donor.size()+"notified");
    }

    public void donar_record(donated d) {
        drr.save(d);


    }

    public void notifyDonors(String bloodGroup, String location, requester requestDetails) {
        requester r = new requester();
        r.setBloodGroup(bloodGroup);
        r.setLocation(location);
        r.setPatientName(requestDetails.getPatientName());
        r.setPatientAge(requestDetails.getPatientAge());
        r.setUnitsRequired(requestDetails.getUnitsRequired());
        r.setHospitalName(requestDetails.getHospitalName());
        r.setHospitalAddress(requestDetails.getHospitalAddress());
        r.setRequiredDate(requestDetails.getRequiredDate());
        r.setRequesterName(requestDetails.getRequesterName());
        r.setRequesterPhone(requestDetails.getRequesterPhone());


        // Use your existing notify method
        this.notify(r);
    }
}

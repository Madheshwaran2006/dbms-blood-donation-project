package com.mmy.projectdb.controller;

import com.mmy.projectdb.Service.servicelayer;

import com.mmy.projectdb.models.donated;
import com.mmy.projectdb.models.donors;
import com.mmy.projectdb.models.requester;
import com.mmy.projectdb.models.users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class Controllerlayer{
    @Autowired
    servicelayer service;

    @PostMapping("/Register")
    public void Register(@RequestBody users u)
    {
        service.register(u);
    }


    @PostMapping("/Login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody users u) {
        Map<String, Object> loginResponse = service.login(u.getemail(), u.getPassword());

        if ("Login Successful".equals(loginResponse.get("message"))) {
            return ResponseEntity.ok(loginResponse);
        } else {
            return ResponseEntity.status(401).body(loginResponse);
        }
    }

    @PostMapping("/Donors/{userId}")
    public ResponseEntity<Map<String,String>> donor_registration(@PathVariable String userId,@RequestBody donors d)
    {
        service.donor_registration(d,userId);
        return ResponseEntity.ok(Map.of("message", "Donor registered successfully"));

    }

    @PostMapping("/Requester")
    public ResponseEntity<String> Requester(@RequestBody requester r)
    {
        service.Request_details(r);
        return ResponseEntity.ok("Registered and notified");
    }
    @GetMapping("/DonorList/{Bloodgroup}/{Location}")
    public List<donors> donor_list(@PathVariable String Bloodgroup, @PathVariable String Location)
    {

        return  service.getdonorlist(Bloodgroup,Location);
    }
    @PostMapping("/NotifyDonors")
    public ResponseEntity<Map<String, String>> notifyDonors(@RequestBody Map<String, Object> notifyRequest) {
        try {
            System.out.println(notifyRequest);

            String bloodGroup = (String) notifyRequest.get("bloodGroup");
            String location = (String) notifyRequest.get("location");

            // Extract request details
            Map<String, Object> requestDetailsMap = (Map<String, Object>) notifyRequest.get("requestDetails");

            // Create requester object for notification
            requester requestDetails = new requester();
            requestDetails.setPatientName((String) requestDetailsMap.get("patientName"));
            requestDetails.setPatientAge(Integer.parseInt(requestDetailsMap.get("patientAge").toString()));
            requestDetails.setBloodGroup((String) requestDetailsMap.get("bloodGroup"));
            requestDetails.setUnitsRequired(Integer.parseInt(requestDetailsMap.get("unitsRequired").toString()));
            requestDetails.setHospitalName((String) requestDetailsMap.get("hospitalName"));
            requestDetails.setHospitalAddress((String) requestDetailsMap.get("hospitalAddress"));
            requestDetails.setLocation((String) requestDetailsMap.get("location"));
            requestDetails.setRequiredDate(LocalDate.parse((String) requestDetailsMap.get("requiredDate")));
            requestDetails.setRequesterName((String) requestDetailsMap.get("requesterName"));
            requestDetails.setRequesterPhone((String) requestDetailsMap.get("requesterPhone"));

            // Call the manual notification service
            service.notifyDonors(bloodGroup, location, requestDetails);

            return ResponseEntity.ok(Map.of("message", "Emails sent successfully to donors"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Failed to send notifications: " + e.getMessage()));
        }
    }

    @PostMapping("/Donated")
    public ResponseEntity<String> donarhistory(@RequestBody donated d )
    {
        service.donar_record(d);
        return ResponseEntity.ok("The donated record is inserted");
    }
}

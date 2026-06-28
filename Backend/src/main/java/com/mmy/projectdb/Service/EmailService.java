package com.mmy.projectdb.Service;


import com.mmy.projectdb.models.donors;
import com.mmy.projectdb.models.requester;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.tomcat.util.http.MimeHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

@Service
@EnableAsync
public class EmailService {

    @Autowired
    private JavaMailSender jmail;


    @Async
    public void bloodrequestemail(String toEmail, String donorName, requester r) throws MessagingException {
        MimeMessage message = jmail.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        helper.setTo(toEmail);
        helper.setSubject("Urgent"+r.getBloodGroup()+"Blood required at "+r.getHospitalName());

        String htmlContent = "<html>" +
                "<body style='font-family: Arial, sans-serif;'>" +
                "<h2 style='color: #d9534f;'>Urgent Blood Requirement</h2>" +
                "<p>Dear <b>" + donorName + "</b>,</p>" +
                "<p>A patient requires your help. Here are the details:</p>" +
                "<ul>" +
                "<li><b>Patient Name:</b> " + r.getPatientName() + "</li>" +
                "<li><b>Patient Age:</b> " + r.getPatientAge() + "</li>" +
                "<li><b>Blood Group Required:</b> " + r.getBloodGroup() + "</li>" +
                "<li><b>Units Required:</b> " + r.getUnitsRequired() + "</li>" +
                "<li><b>Hospital:</b> " + r.getHospitalName() + "</li>" +
                "<li><b>Location:</b> " + r.getHospitalAddress() + " (" + r.getLocation() + ")</li>" +
                "<li><b>Contact Person:</b> " + r.getRequesterName() + " (" + r.getRequesterPhone() + ")</li>" +
                "<li><b>Required Date:</b> " + r.getRequiredDate() + "</li>" +
                "</ul>" +
                "<p>Please ensure you are eligible to donate (3+ months since last donation and medically fit).</p>" +
                "<br/>" +
                "<p>Thank you for saving a life! ❤️</p>" +
                "<p>Blood Donation Support Team</p>" +
                "</body></html>";
        helper.setText(htmlContent,true);
        jmail.send(message);
    }
}

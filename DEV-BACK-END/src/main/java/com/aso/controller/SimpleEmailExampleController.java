package com.aso.controller;

import com.aso.service.gmail.MyConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SimpleEmailExampleController {

    @Autowired
    public JavaMailSender emailSender;

    @ResponseBody
    @RequestMapping("/sendSimpleEmail")
    public String sendSimpleEmail() {

        // Create a Simple MailMessage.
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom ( MyConstants.MY_EMAIL );
        message.setSubject ( "test" );
        message.setTo("hangdinhphankhanh@gmail.com");
        message.setSubject("Dear Hằng Đinh");
        message.setText("Em test tính năng thôi, nhưng chúc chị tuổi mới thật thành công :D");
        System.out.println (emailSender);

        this.emailSender.send(message);
        return "Email Sent!";
    }

}

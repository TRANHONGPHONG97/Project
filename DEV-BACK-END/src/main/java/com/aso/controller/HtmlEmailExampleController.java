package com.aso.controller;

import com.aso.service.gmail.MyConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Controller
public class HtmlEmailExampleController {
    @Autowired
    public JavaMailSender emailSender;

    @ResponseBody
    @RequestMapping("/sendHtmlEmail")
    public String sendHtmlEmail() throws MessagingException {

        MimeMessage message = emailSender.createMimeMessage();

        boolean multipart = true;

        MimeMessageHelper helper = new MimeMessageHelper(message, multipart, "utf-8");

        String htmlMsg = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "        <meta charset=\"utf-8\" />\n" +
                "        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n" +
                "        <meta name=\"theme-color\" content=\"#000000\" />\n" +
                "        <meta name=\"description\" content=\"Web site created using create-react-app\" />\n" +
                "</head>" +
                "<body>\n" +
                "<p style=\"color: red; font-weight: bold\" th:text=\"'Chào ' + Milo + ','\"></p>\n" +
                "<p th:text=\"'Sản phẩm ' + Tv + ' của bạn đang được chuẩn bị.'\"></p>\n" +
                "<p>Cám ơn bạn đã tham gia và ủng hộ!</p>\n" +
                "</body>\n" +
                "</html>";

        message.setContent(htmlMsg, "text/html");

        helper.setTo( MyConstants.FRIEND_EMAIL);

        helper.setSubject("Test send HTML email");


        this.emailSender.send(message);

        return "Đã gửi email thành công!";
    }
}

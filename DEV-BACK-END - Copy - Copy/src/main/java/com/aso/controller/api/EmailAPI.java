package com.aso.controller.api;

import com.aso.model.Product;
import com.aso.model.dto.AccountDTO;
import com.aso.model.dto.ProductDTO;
import com.aso.service.account.AccountService;
import com.aso.service.gmail.MyConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emails")
public class EmailAPI {

    @Autowired
    private AccountService accountService;
    @Autowired
    private JavaMailSender emailSender;

    @PostMapping("/auctions-success/{email}")
    public ResponseEntity<?> sendEmailSuccessAuctions (@PathVariable("email") String email, @RequestBody ProductDTO productDTO) {
        AccountDTO accountDTO = accountService.findAccountByEmail ( email );

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom ( MyConstants.MY_EMAIL );
        message.setSubject ( "Thông báo!" );
        message.setTo(email);
        message.setSubject("Xin chào " + accountDTO.getFullName ());
        message.setText("Chúc mừng bạn đã chiến thắng phiên đấu giá với sản phẩm là: " + productDTO.getTitle () + "\n" +
                        "Sản phẩm đã được gửi vào giỏ hàng của bạn, hãy vào giỏ hàng để hoàn tất thanh toán.");
        System.out.println (emailSender);

        this.emailSender.send(message);
        return new ResponseEntity<> ( HttpStatus.OK);
    }
}

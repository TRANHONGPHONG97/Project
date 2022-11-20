package com.aso.controller.api;

import com.aso.exception.DataInputException;
import com.aso.exception.ResourceNotFoundException;
import com.aso.model.Account;
import com.aso.model.JwtResponse;
import com.aso.model.dto.AccountDTO;
import com.aso.service.account.AccountService;
import com.aso.service.gmail.MyConstants;
import com.aso.service.jwt.JwtService;
import com.aso.utils.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/auth")
public class AuthAPI {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AccountService accountService;

    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private AppUtil appUtils;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors())
            return appUtils.mapErrorToResponse(bindingResult);

        if (accountDTO.getSurplus() == null) {
            accountDTO.setSurplus(new BigDecimal(0));
        }

        try {
            Account account = accountService.doRegister(accountDTO);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom ( MyConstants.MY_EMAIL );
            message.setSubject ( "Chào mừng bạn đến với Auction Shop!" );
            message.setTo(account.getEmail ());
            message.setSubject("Dear " + account.getFullName ());
            message.setText("Cám ơn bạn đã tham gia và ủng hộ Auction Shop! \n" +
                    "Chúc bạn có những trải nghiệm thật thú vị.");
            this.emailSender.send(message);
            return new ResponseEntity<>(HttpStatus.CREATED);

        } catch (DataIntegrityViolationException e) {
            throw new DataInputException("Thông tin tài khoản không hợp lệ, vui lòng kiểm tra lại thông tin!");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Account account) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken (account.getEmail(), account.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtService.generateTokenLogin(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Account currentUser = accountService.getByEmail(account.getEmail()).get ();

            JwtResponse jwtResponse = new JwtResponse(
                    jwt,
                    currentUser.getId(),
                    currentUser.getUsername(),
                    currentUser.getEmail(),
                    userDetails.getAuthorities()
            );

            ResponseCookie springCookie = ResponseCookie.from("JWT", jwt)
                    .httpOnly(false)
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 60 * 1000 * 2)
                    .build();

            System.out.println(jwtResponse);

            return ResponseEntity
                    .ok()
                    .header( HttpHeaders.SET_COOKIE, springCookie.toString())
                    .body(jwtResponse);
        } catch (Exception e) {
            e.printStackTrace ();
            throw new ResourceNotFoundException ( "Tài khoản hoặc mật khẩu không chính xác!" );
        }
    }
}

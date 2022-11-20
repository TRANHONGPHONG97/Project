package com.aso.controller.api;


import com.aso.exception.DataInputException;
import com.aso.model.Account;
import com.aso.model.dto.CartDTO;
import com.aso.service.account.AccountService;
import com.aso.service.cart.CartService;
import com.aso.utils.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.Optional;

@RestController
@RequestMapping("/api/carts")
public class CartAPI {
    @Autowired
    private CartService cartService;

    @Autowired
    private AppUtil appUtils;

    @Autowired
    private AccountService accountService;

    @GetMapping("/{accountId}")
    public ResponseEntity<?> getCartByUserName(@PathVariable Long accountId){
        Optional<CartDTO> cartDTO = cartService.findCartDTOByIdAccountInfo ( accountId );
        if ( !cartDTO.isPresent () ) {
            throw new DataInputException ( "Không tồn tại giỏ hàng!" );
        }

        return new ResponseEntity<>(cartDTO.get().toCart (),HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> doCreate(@RequestBody CartDTO cartDTO, BindingResult bindingResult) throws MessagingException, UnsupportedEncodingException {
        if (bindingResult.hasErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }

        Optional<Account> accountOptional = accountService.findById ( cartDTO.getAccount ().getId () );

        if ( !accountOptional.isPresent () ) {
            return new ResponseEntity<>("Tài khoản không tồn tại!",HttpStatus.NO_CONTENT);
        }

        try {
            cartDTO.setAccount ( accountOptional.get ().toAccountDTO () );
            cartService.save(cartDTO.toCart());
            return new ResponseEntity<>("Tạo giỏ hàng thành công!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("không thể tạo được đơn hàng!",HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/remove")
    public ResponseEntity<?> doRemove(Long accountId) {

        try {
            return new ResponseEntity<>("Tạo giỏ hàng thành công!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("không thể tạo được đơn hàng!",HttpStatus.BAD_REQUEST);
        }
    }
}

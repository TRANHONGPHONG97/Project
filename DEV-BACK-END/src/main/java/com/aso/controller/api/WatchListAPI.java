package com.aso.controller.api;

import com.aso.exception.AccountInputException;
import com.aso.exception.DataInputException;
import com.aso.exception.DataOutputException;
import com.aso.model.Account;
import com.aso.model.Product;
import com.aso.model.dto.ProductDTO;
import com.aso.model.dto.WatchListDTO;
import com.aso.service.account.AccountService;
import com.aso.service.product.ProductService;
import com.aso.service.watchList.WatchListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/watch-lists")
public class WatchListAPI {
    @Autowired
    private WatchListService watchListService;

    @Autowired
    private AccountService accountService;
    @Autowired
    private ProductService productService;

    @GetMapping("/{accountId}")
    public ResponseEntity<?> getWatchListByAccountId(@PathVariable("accountId") Long accountId) {

        try {
            Optional<Account> accountOptional = accountService.findById ( accountId );
            if ( !accountOptional.isPresent () ) {
                throw new AccountInputException ( "Tài khoản không tồn tại" );
            }
            List<WatchListDTO> watchListDTOS = watchListService.getWatchListDTOsByAccountId ( accountId );
            if ( watchListDTOS.isEmpty () ) {
                throw new DataOutputException ( "Danh sách yêu thích đang trống" );
            }
            return new  ResponseEntity<> (watchListDTOS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<> ( e.getMessage (), HttpStatus.NO_CONTENT );
        }
    }

    @PostMapping("/check/{accountId}")
    public ResponseEntity<?> getWatchListByAccountIdAndProductId(@PathVariable("accountId") Long accountId, @RequestBody ProductDTO productDTO) {

        try {
            Optional<Account> accountOptional = accountService.findById ( accountId );
            if ( !accountOptional.isPresent () ) {
                throw new AccountInputException ( "Tài khoản không tồn tại" );
            }

            Optional<Product> productOptional = productService.findProductBySlug ( productDTO.getSlug () ) ;
            if (!productOptional.isPresent ()) {
                throw new DataInputException ( "Sản phẩm không tồn tại" );
            }

            WatchListDTO watchListDTO = watchListService.getWatchListDTOsByAccountIdAndProductId ( accountId, productOptional.get ().getId () );
            return new  ResponseEntity<> (watchListDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<> ( e.getMessage (), HttpStatus.NO_CONTENT );
        }
    }

    @PostMapping("/add/{accountId}")
    public ResponseEntity<?> addWatchedList(@PathVariable("accountId") Long accountId, @RequestBody ProductDTO productDTO) {
        try {
            Optional<Account> accountOptional = accountService.findById ( accountId );
            if ( !accountOptional.isPresent () ) {
                throw new AccountInputException ( "Tài khoản không tồn tại" );
            }

            Optional<Product> productOptional = productService.findProductBySlug ( productDTO.getSlug () ) ;
            if (!productOptional.isPresent ()) {
                throw new DataInputException ( "Sản phẩm không tồn tại" );
            }

            WatchListDTO newWatchListDTO = watchListService.doAddWatchList ( accountOptional.get (), productOptional.get () );

            return new ResponseEntity<> ( newWatchListDTO, HttpStatus.CREATED );
        }catch (Exception e) {
            return new ResponseEntity<> (e.getMessage (), HttpStatus.BAD_GATEWAY);
        }
    }

    @PostMapping("/remove/{accountId}")
    public ResponseEntity<?> removeWatchedList(@PathVariable("accountId") Long accountId, @RequestBody ProductDTO productDTO) {
        try {
            Optional<Account> accountOptional = accountService.findById ( accountId );
            if ( !accountOptional.isPresent () ) {
                throw new AccountInputException ( "Tài khoản không tồn tại" );
            }

            Optional<Product> productOptional = productService.findProductBySlug ( productDTO.getSlug () ) ;
            if (!productOptional.isPresent ()) {
                throw new DataInputException ( "Sản phẩm không tồn tại" );
            }

            watchListService.doRemoveWatchList ( accountOptional.get (), productOptional.get () );

            return new ResponseEntity<> (HttpStatus.OK);
        }catch (Exception e) {
            return new ResponseEntity<> (e.getMessage (), HttpStatus.BAD_GATEWAY);
        }
    }
}

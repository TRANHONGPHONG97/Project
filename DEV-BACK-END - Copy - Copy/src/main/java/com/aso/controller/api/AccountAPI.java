package com.aso.controller.api;

import com.aso.exception.DataInputException;
import com.aso.exception.ResourceNotFoundException;
import com.aso.model.Account;
import com.aso.model.LocationRegion;
import com.aso.model.Role;
import com.aso.model.dto.AccountDTO;
import com.aso.repository.AccountRepository;
import com.aso.service.account.AccountService;
import com.aso.service.location.LocationRegionService;
import com.aso.service.role.RoleService;
import com.aso.utils.AppUtil;
import com.aso.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
public class AccountAPI {

    @Autowired
    AccountService accountService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AppUtil appUtil;

    @Autowired
    private Validation validation;

    @Autowired
    RoleService roleService;

    @Autowired
    LocationRegionService locationRegionService;

    @GetMapping
    public ResponseEntity<?> getAllAccounts() {

        try {
            List<AccountDTO> accountDTOList = accountService.findAccountDTOAll();

            if ( accountDTOList.isEmpty () ) {
                return new ResponseEntity<> ( HttpStatus.NO_CONTENT );
            }
            return new ResponseEntity<> ( accountDTOList, HttpStatus.OK );

        } catch (Exception e) {
            return new ResponseEntity<> ( HttpStatus.BAD_REQUEST );
        }
    }

    @GetMapping("/getAccount/{username}")
    public ResponseEntity<?> getAccountByUserName(@PathVariable String username) {


        Optional<AccountDTO> accountOptional = accountService.findUserDTOByUsername(username);

        if (!accountOptional.isPresent ()) {
            throw new ResourceNotFoundException("Tài khoản không tồn tại!");
        }

        return new ResponseEntity<>(accountOptional.get().toAccount(), HttpStatus.OK);
    }

    @GetMapping("/getAccount/account/{accountId}")
    public ResponseEntity<?> getAccountById(@PathVariable String accountId) {

        if (!validation.isIntValid(accountId)) {
            throw new DataInputException("Tài khoản không tồn tại!");
        }
        Long account_id = Long.parseLong(accountId);

        Optional<AccountDTO> accountByIdDTO = accountService.findAccountByIdDTO(account_id);

        if (!accountByIdDTO.isPresent ()) {
            throw new ResourceNotFoundException("Tài khoản không tồn tại!");
        }

        return new ResponseEntity<>(accountByIdDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@Validated @RequestBody AccountDTO accountDTO,
                                           BindingResult bindingResult) {

        if ( bindingResult.hasErrors () )
            return appUtil.mapErrorToResponse ( bindingResult );

        Optional<AccountDTO> optionalAccountDTO = accountService.findUserDTOByUsername ( accountDTO.getUsername () );

        if ( optionalAccountDTO.isPresent () )
            bindingResult.addError ( new FieldError ( "username", "username", "Tên đăng nhập này đã tồn tại!" ) );

        if ( accountService.existsByEmail ( accountDTO.getEmail () ) )
            bindingResult.addError ( new FieldError ( "email", "email", "Email này đã tồn tại!" ) );
        if ( accountService.existsByPhone ( accountDTO.getPhone () ) )
            bindingResult.addError ( new FieldError ( "phone", "phone", "Số điện thoại này đã tồn tại!" ) );
        if ( bindingResult.hasErrors () )
            return appUtil.mapErrorToResponse ( bindingResult );

        Optional<Role> optionalRole = roleService.findById ( accountDTO.getRole ().getId () );

        if (!optionalRole.isPresent ()) {
            bindingResult.addError ( new FieldError ( "role", "role", " Chức năng Role không hợp lệ ! " ) );
        }

        try {
            Account newAccount = accountService.doCreate ( accountDTO );
            return new ResponseEntity<> ( newAccount.toAccountDTO (), HttpStatus.CREATED );
        } catch (DataIntegrityViolationException e) {
            throw new DataInputException ( "Thông tin tài khoản không hợp lệ, vui lòng kiểm tra lại! " );
        } catch (Exception e) {
            return new ResponseEntity<> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> editAccount(@PathVariable Long id,
                                         @Validated @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {

        String email = appUtil.getPrincipalEmail();
        if ( bindingResult.hasErrors () )
            return appUtil.mapErrorToResponse ( bindingResult );

        accountDTO.setId ( id );
        if ( accountService.existsByEmail ( accountDTO.getEmail () ) )
            bindingResult.addError ( new FieldError ( "email", "email", "Email này đã tồn tại!" ) );
        if ( accountService.existsByPhone ( accountDTO.getPhone () ) )
            bindingResult.addError ( new FieldError ( "phone", "phone", "Số điện thoại này đã tồn tại! " ) );
        if ( accountService.existsByUsername ( accountDTO.getUsername () ) )
            bindingResult.addError ( new FieldError ( "username", "username", "Tên đăng nhập này đã tồn tại!" ) );

        Optional<Account> accountOptional = accountService.findById ( id );
        Account accountOption = accountOptional.get();

        try {
            accountOption.setUpdatedAt(new Date());
            accountOption.setUpdatedBy(email);
            accountOption.setEmail(accountDTO.getEmail());
            accountOption.setAvatar(accountDTO.getAvatar());
            accountOption.setFullName(accountDTO.getFullName());
            accountOption.setPhone(accountDTO.getPhone());
            accountOption.setUsername(accountDTO.getUsername());
            accountOption.setLocationRegion(accountDTO.toLocationRegion());
            accountOption.setRole(accountDTO.getRole().toRole());

            Account updatedAccount = accountService.editAccount( accountOption );
            LocationRegion locationRegion = accountDTO.getLocationRegion().toLocationRegion();
            locationRegionService.save(locationRegion);
            return new ResponseEntity<> ( updatedAccount.toAccountDTO (), HttpStatus.OK );

        } catch (DataIntegrityViolationException e) {
            throw new DataInputException ( "Thông tin tài khoản không hợp lệ, vui lòng kiểm tra lại!" );
        } catch (Exception e) {
            return new ResponseEntity<> (HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @PatchMapping("/block/{id}")
    public ResponseEntity<?> blockAccount(@PathVariable Long id) {

        Optional<Account> account = accountService.findById ( id );
        if ( account.isPresent () ) {
            try {
                accountService.blockUser ( id );
                return new ResponseEntity<> ( HttpStatus.OK );

            } catch (Exception e) {
                return new ResponseEntity<> ( HttpStatus.NOT_FOUND );
            }
        }
        return new ResponseEntity<> ( "Tài khoản này không tồn tại!", HttpStatus.NOT_FOUND );
    }

    @PatchMapping("/unblock/{id}")
    public ResponseEntity<?> unblockAccount(@PathVariable Long id) {
        Optional<Account> account = accountService.findById ( id );
        if ( account.isPresent () ) {
            try {
                accountService.unblockUser ( id );
                return new ResponseEntity<> ( HttpStatus.OK );
            } catch (Exception e) {
                return new ResponseEntity<> ( HttpStatus.NOT_FOUND );
            }
        }
        return new ResponseEntity<> ( "Tài khoản này không tồn tại!", HttpStatus.NOT_FOUND );
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Long id) {
        Optional<Account> account = accountService.findByIdAndDeletedFalse ( id );
        if ( account.isPresent () ) {
            try {
                account.get ().setDeleted ( true );
                accountService.editAccount ( account.get () );
                return new ResponseEntity<> ( HttpStatus.OK );
            } catch (DataIntegrityViolationException e) {
                return new ResponseEntity<> ( HttpStatus.NOT_FOUND );
            }
        }
        return new ResponseEntity<> ( "Tài khoản này không tồn tại!", HttpStatus.NOT_FOUND );
    }
    @GetMapping("/p")
    public ResponseEntity<Page<AccountDTO>> getAllBooks(Pageable pageable) {
        Page<AccountDTO> accountDTOPage = accountService.findAllAccounts(pageable);
        return new ResponseEntity<>(accountDTOPage, HttpStatus.OK);
    }

    @GetMapping("/p/{keyword}")
    public ResponseEntity<Page<AccountDTO>> getAllBookss(Pageable pageable, @PathVariable("keyword") String keyword) {
        try {
            keyword = "%" + keyword + "%";
            Page<AccountDTO> accountDTOPage = accountService.findAllAccountss(pageable, keyword);
            return new ResponseEntity<>(accountDTOPage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAccountEmail/{email}")
    public ResponseEntity<?> getAccountByEmail(@PathVariable String email) {

        Optional<AccountDTO> accountOptional = accountService.findUserDTOByEmail(email);

        if (!accountOptional.isPresent ()) {
            throw new ResourceNotFoundException("Email không tồn tại!");
        }
        return new ResponseEntity<>(accountOptional.get().toAccount(), HttpStatus.OK);
    }

    @PostMapping("/restartPassword")
    public ResponseEntity<?> doRestartPassword(@RequestBody AccountDTO accountDTO) {
        String email = appUtil.getPrincipalEmail();
        Optional<Account> accountOptional = accountService.findById ( accountDTO.getId() );
        Account accountOption = accountOptional.get();

        try {
            accountOption.setUpdatedBy(email);
            accountOption.setPassword(accountDTO.getPassword());

            Account updatedAccount = accountService.save( accountOption );
            return new ResponseEntity<> ( updatedAccount.toAccountDTO (), HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi đổi không được mật khẩu! ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/update/password")
    public ResponseEntity<?> updatePasswordAccount(@RequestBody AccountDTO accountDTO) {
        Optional<Account> accountOptional = accountService.findById ( accountDTO.getId() );
        if (!accountOptional.isPresent ()) {
            throw new ResourceNotFoundException("Tài khoản không tồn tại!");
        }
        try {
            accountOptional.get().setUpdatedAt(new Date());
            accountOptional.get().setPassword(accountDTO.getPassword());
            Account updatedAccount = accountService.save(accountOptional.get());
            return new ResponseEntity<> ( updatedAccount.toAccountDTO (), HttpStatus.OK );
        } catch (DataIntegrityViolationException e) {
            throw new DataInputException ( "Thông tin tài khoản không hợp lệ, vui lòng kiểm tra lại ! " );
        } catch (Exception e) {
            return new ResponseEntity<> (HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> doDeposit(@RequestBody AccountDTO accountDTO) {
        String email = appUtil.getPrincipalEmail();
        Optional<Account> accountOptional = accountService.findById ( accountDTO.getId() );
        Account accountOption = accountOptional.get();

        try {
            accountOption.setUpdatedBy(email);
            accountOption.setSurplus(accountOption.getSurplus().add(accountDTO.getSurplus()));

            Account updatedAccount = accountService.editAccount( accountOption );
            return new ResponseEntity<> ( updatedAccount.toAccountDTO (), HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi không nạp được tiền vào tài khoản! ", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package com.aso.service.account;

import com.aso.exception.DataInputException;
import com.aso.exception.DataOutputException;
import com.aso.model.*;
import com.aso.model.dto.AccountDTO;
import com.aso.repository.AccountRepository;
import com.aso.service.gmail.MyConstants;
import com.aso.service.location.LocationRegionService;
import com.aso.service.role.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private LocationRegionService locationRegionService;
    @Autowired
    private RoleService roleService;

    @Autowired
    public JavaMailSender emailSender;

    @Override
    public Iterable<Account> findAll() {
        return accountRepository.findAll ();
    }
//
//    @Override
//    public Optional<Account> findById(Long id) {
//        return accountRepository.findById ( id );
//    }

    @Override
    public Account save(Account user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return accountRepository.save(user);
    }

    @Override
    public Account getById(Long id) {
        return null;
    }

    @Override
    public void softDelete(Account account) {

    }

    @Override
    public void delete(Product id) {
        accountRepository.deleteById ( id );
    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public List<AccountDTO> findAllAccountsDTO() {
        return accountRepository.findAllAccountsDTO();
    }

    @Override
    public List<AccountDTO> findAllUsersDTODeleted() {
        return accountRepository.findAllUsersDTODeleted ();
    }

    @Override
    public List<AccountDTO> findAllUsersDTODeletedFalseAndActiveTrue() {
        return accountRepository.findAllUsersDTODeletedFalseAndActiveTrue ();
    }

    @Override
    public List<AccountDTO> findAllUsersDTODeletedFalseAndActiveFalse() {
        return accountRepository.findAllUsersDTODeletedFalseAndActiveFalse ();
    }

    @Override
    public Optional<Account> findByIdAndDeletedFalse(Long id) {
        return accountRepository.findByIdAndDeletedFalse(id);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return accountRepository.existsByUsername ( username );
    }

    @Override
    public Boolean existsByEmail(String email) {
        return accountRepository.existsByEmail ( email );
    }

    @Override
    public Boolean existsByPhone(String phone) {
        return accountRepository.existsByPhone ( phone );
    }

    @Override
    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername ( username );
    }

    @Override
    public Optional<AccountDTO> findUserDTOByUsername(String username) {
        return accountRepository.findUserDTOByUsername ( username );
    }

    @Override
    public Optional<AccountDTO> findUserDTOByEmail(String email) {
        return accountRepository.findUserDTOByEmail ( email );
    }
    @Override
    public Optional<AccountDTO> findUserDTOById(Long id) {
        return accountRepository.findUserDTOById ( id );
    }

    @Override
    public Optional<Account> findById(Long id) {
        return accountRepository.findById(id);
    }

    @Override
    public void removeById(Account account) {

    }

    @Override
    public Optional<Account> getByUsername(String username) {
        return accountRepository.getByUsername ( username );
    }

    @Override
    public Optional<Account> getByEmail(String email) {
        return accountRepository.getByEmail(email);
    }

    @Override
    public Account create(AccountDTO newAccount) {
        return null;
    }


    @Override
    public void blockUser(Long userId) {
        accountRepository.blockUser ( userId );

    }

    public void unblockUser(Long userId){
        accountRepository.unblockUser(userId);
    }

    @Override
    public Account findByBlockedIsFalseAndId(Long id) {
        return accountRepository.findByBlockedIsFalseAndId ( id );
    }

    @Override
    public void deleteData(Long userId) {
        accountRepository.deleteData ( userId );
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Account> accountOptional = accountRepository.findByEmail ( email );
        if ( !accountOptional.isPresent () ) {
            throw new UsernameNotFoundException ( email );
        }
        return AccountPrinciple.build ( accountOptional.get () );
    }

    @Override
    public Account doCreate(AccountDTO accountDTO) {

        boolean checkUsername = accountRepository.existsByUsername(accountDTO.getUsername());
        if (checkUsername) {
            throw new DataInputException( "Tên đăng nhập này đã tồn tại!");
        }

        boolean checkEmail = accountRepository.existsByEmail(accountDTO.getEmail());
        if (checkEmail) {
            throw new DataInputException( "Email này đã tồn tại!");
        }

        boolean checkPhone = accountRepository.existsByPhone(accountDTO.getPhone());
        if (checkPhone) {
            throw new DataInputException( "Số điện thoại này đã tồn tại!");
        }

        Optional<Role> optionalRole = roleService.findById(accountDTO.getRole().getId());
        LocationRegion locationRegion = accountDTO.getLocationRegion().toLocationRegion ();
        LocationRegion newLocationRegion = locationRegionService.save ( locationRegion );
        accountDTO.setRole ( optionalRole.get ().toRoleDTO () );
        accountDTO.setLocationRegion( newLocationRegion.toLocationRegionDTO () );
        Account account = accountDTO.toAccountAllAttribute ();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom ( MyConstants.MY_EMAIL );
        message.setSubject ( "Chào mừng bạn đến với Auction Shop!" );
        message.setTo(account.getEmail ());
        message.setSubject("Dear " + account.getFullName ());
        message.setText("Cám ơn bạn đã tham gia và ủng hộ Auction Shop! \n" +
                "Chúc bạn có những trải nghiệm thật thú vị.");
        this.emailSender.send(message);
        return save(account);
    }
    @Override
    public Account doRegister(AccountDTO accountDTO) {

        boolean checkUsername = accountRepository.existsByUsername(accountDTO.getUsername());
        if (checkUsername) {
            throw new DataInputException( "Tên đăng nhập này đã tồn tại!");
        }

        boolean checkEmail = accountRepository.existsByEmail(accountDTO.getEmail());
        if (checkEmail) {
            throw new DataInputException( "Email này đã tồn tại!");
        }

        boolean checkPhone = accountRepository.existsByPhone(accountDTO.getPhone());
        if (checkPhone) {
            throw new DataInputException( "Số điện thoại này đã tồn tại!");
        }

        Optional<Role> optionalRole = roleService.findById(2L);
        LocationRegion locationRegion = accountDTO.getLocationRegion().toLocationRegion ();
        LocationRegion newLocationRegion = locationRegionService.save ( locationRegion );
        accountDTO.setRole ( optionalRole.get ().toRoleDTO () );
        accountDTO.setLocationRegion( newLocationRegion.toLocationRegionDTO () );
        Account account = accountDTO.toAccountAllAttribute ();

        return save(account);
    }

    @Override
    public List<AccountDTO> findAccountDTOAll() {
        return accountRepository.findAccountDTOAll();
    }

    @Override
    public Optional<AccountDTO> findAccountByIdDTO(Long id) {
        return accountRepository.findAccountByIdDTO(id);
    }

    @Override
    public Page<AccountDTO> findAllAccounts(Pageable pageable) {
        return accountRepository.findAllAccounts(pageable);
    }

    @Override
    public Page<AccountDTO> findAllAccountss(Pageable pageable, String keyword) {
        return accountRepository.findAllAccountss(pageable, keyword);
    }

    @Override
    public AccountDTO findAccountByEmail(String createBy) {
        return accountRepository.findAccountByEmail(createBy);
    }

    @Override
    public Account editAccount(Account account) {
        return accountRepository.save ( account );
    }

    @Override
    public Account updatePasswordAccount(Account account) {
        return accountRepository.save ( account );
    }

}

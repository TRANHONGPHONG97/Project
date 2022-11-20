package com.aso.service.account;

import com.aso.model.Account;
import com.aso.model.dto.AccountDTO;
import com.aso.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface AccountService extends IGeneralService<Account>, UserDetailsService {

    List<AccountDTO> findAllAccountsDTO();

    List<AccountDTO> findAllUsersDTODeleted();

    List<AccountDTO> findAllUsersDTODeletedFalseAndActiveTrue();

    List<AccountDTO> findAllUsersDTODeletedFalseAndActiveFalse();


    Optional<Account> findByIdAndDeletedFalse(Long id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByPhone(String phone);


    Optional<Account> findByUsername(String username);

    Optional<AccountDTO> findUserDTOByUsername(String username);
    Optional<AccountDTO> findUserDTOByEmail(String email);
    Optional<AccountDTO> findUserDTOById(Long id);


    Optional<Account> getByUsername(String username);
    Optional<Account> getByEmail(String email);

    Account create(AccountDTO newAccount);


    void blockUser(Long userId);

    void unblockUser(Long userId);

    Account findByBlockedIsFalseAndId(Long id);

    void deleteData(Long userId);

    Account doCreate(AccountDTO accountDTO);
    Account doRegister(AccountDTO accountDTO);

    List<AccountDTO> findAccountDTOAll();
    Optional<AccountDTO> findAccountByIdDTO(Long id);
    Page<AccountDTO> findAllAccounts(Pageable pageable);
    Page<AccountDTO> findAllAccountss(Pageable pageable, @Param("keyword") String keyword);

    AccountDTO findAccountByEmail(String createBy);

    Account editAccount(Account account);
    Account updatePasswordAccount(Account account);
}

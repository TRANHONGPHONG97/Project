package com.aso.repository;

import com.aso.model.Account;
import com.aso.model.Product;
import com.aso.model.dto.AccountDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> getByUsername(String username);
    Optional<Account> getByEmail(String email);

    @Query("SELECT new com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.blocked, " +
            "a.locationRegion " +
            ") " +
            "FROM Account AS a WHERE a.deleted = false"
    )
    List<AccountDTO> findAllAccountsDTO();

    @Query("SELECT new com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.password, " +
            "a.blocked, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.role, " +
            "a.locationRegion " +
            ") " +
            "FROM Account AS a WHERE a.deleted = false ORDER BY a.id DESC "
    )
    List<AccountDTO> findAccountDTOAll();

    @Query("SELECT new com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.password, " +
            "a.blocked, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.role, " +
            "a.locationRegion " +
            ") " +
            "FROM Account AS a WHERE a.id = ?1"
    )
    Optional<AccountDTO> findAccountByIdDTO(Long id);

    @Query("SELECT new com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.blocked, " +
            "a.locationRegion" +
            ") " +
            "FROM Account AS a WHERE a.deleted = true and a.role.id = 2")
    List<AccountDTO> findAllUsersDTODeleted();

    @Query("SELECT new com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.blocked, " +
            "a.locationRegion" +
            ") " +
            "FROM Account AS a WHERE a.deleted = false and a.role.id = 2 and a.blocked = false "
    )
    List<AccountDTO> findAllUsersDTODeletedFalseAndActiveTrue();

    @Query("SELECT new com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.blocked, " +
            "a.locationRegion" +
            ") " +
            "FROM Account AS a WHERE a.deleted = false and a.role.id = 2 and a.blocked = true "
    )
    List<AccountDTO> findAllUsersDTODeletedFalseAndActiveFalse();

    Optional<Account> findByUsername(String username);
    Optional<Account> findByEmail(String email);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    Boolean existsByPhone(String phone);

    @Query("SELECT NEW com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.password, " +
            "a.blocked, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.role, " +
            "a.locationRegion" +
            ") " +
            "FROM Account AS a " +
            "WHERE a.email = ?1"
    )
    Optional<AccountDTO> findUserDTOByEmail(String email);

    Account findByBlockedIsFalseAndId(Long id);

    @Query("SELECT NEW com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.blocked, " +
            "a.locationRegion " +
            ") " +
            "FROM Account AS a " +
            "WHERE a.username = ?1"
    )
    Optional<AccountDTO> findUserDTOByUsername(String username);

    @Query("SELECT NEW com.aso.model.dto.AccountDTO (" +
            "a.id, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.blocked, " +
            "a.locationRegion " +
            ") " +
            "FROM Account AS a " +
            "WHERE a.id = ?1"
    )
    Optional<AccountDTO> findUserDTOById(Long id);

    @Modifying
    @Query("UPDATE Account AS a " +
            "SET a.blocked = 1 " +
            "WHERE a.id = :userId")
    void blockUser(@Param("userId") Long userId);


    @Modifying
    @Query("UPDATE Account AS a " +
            "SET a.blocked = 0 " +
            "WHERE a.id = :userId")
    void unblockUser(@Param("userId") Long userId);

    @Modifying
    @Query("DELETE FROM Account AS a WHERE (a.id = :userId)")
    void deleteData(@Param("userId") Long userId);

    Optional<Account> findByIdAndDeletedFalse(Long id);

    @Query("SELECT new com.aso.model.dto.AccountDTO(" +
            "a.id, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.blocked, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.role, " +
            "a.locationRegion" +
            ") " +
            "FROM Account AS a WHERE a.email = ?1")
    AccountDTO findAccountByEmail(String createBy);

    void deleteById(Product id);

    @Query("SELECT NEW com.aso.model.dto.AccountDTO(" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.password, " +
            "a.blocked, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.role, " +
            "a.locationRegion " +
            ") FROM Account AS a WHERE (a.fullName LIKE :keyword OR a.email LIKE :keyword OR a.role.code LIKE :keyword) AND a.deleted = false" +
            " ORDER BY a.id DESC")
    Page<AccountDTO> findAllAccountss(Pageable pageable, @Param("keyword") String keyword);

    @Query("SELECT NEW com.aso.model.dto.AccountDTO(" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.username, " +
            "a.fullName, " +
            "a.email, " +
            "a.phone, " +
            "a.password, " +
            "a.blocked, " +
            "a.avatar, " +
            "a.surplus, " +
            "a.role, " +
            "a.locationRegion " +
            ") FROM Account AS a WHERE a.deleted = false ORDER BY a.id DESC")
    Page<AccountDTO> findAllAccounts(Pageable pageable);

}

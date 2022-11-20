package com.aso.repository;


import com.aso.model.Cart;
import com.aso.model.dto.CartDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByCreatedBy(String createdBy);

    Boolean existsByCreatedBy(String createdBy);
    @Query("SELECT NEW com.aso.model.dto.CartDTO (" +
            "c.id, " +
            "c.status, " +
            "c.account " +
            " )  " +
            "FROM Cart c  WHERE c.account.id = ?1 AND c.status.id = 2 ")
    Optional<CartDTO> findCartDTOByIdAccountInfo(Long accountId);
}

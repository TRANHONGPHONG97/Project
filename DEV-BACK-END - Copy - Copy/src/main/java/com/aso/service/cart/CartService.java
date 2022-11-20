package com.aso.service.cart;


import com.aso.model.Cart;
import com.aso.model.dto.CartDTO;
import com.aso.service.IGeneralService;

import java.util.Optional;

public interface CartService extends IGeneralService<Cart> {

    Optional<Cart> findByCreatedBy(String createdBy);

    Boolean existsByCreatedBy(String createdBy);

    void delete(Cart cart);
    Optional<CartDTO> findCartDTOByIdAccountInfo(Long id);
}

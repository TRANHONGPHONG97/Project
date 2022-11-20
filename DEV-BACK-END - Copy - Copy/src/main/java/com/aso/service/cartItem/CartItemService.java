package com.aso.service.cartItem;

import com.aso.model.Cart;
import com.aso.model.CartItem;
import com.aso.model.dto.CartItemDTO;
import com.aso.service.IGeneralService;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface CartItemService extends IGeneralService<CartItem> {

    Optional<CartItem> findByProductId(Long productId);

    List<CartItem> findAllByCart(Cart cart);

    BigDecimal getSumAmountByCartId(Long cartId);

    List<CartItemDTO> findAllCartItemsDTO(@Param("cartId") Long cartId);

    List<CartItemDTO> findCartItemDTOByEmail(String email);

    Optional<CartItemDTO> getCartItemDTOById(Long id);

    CartItem doSaveCartItem(Long accountId, CartItemDTO cartItemDTO);

    List<CartItemDTO> doRemoveCartItems (String email, List<CartItemDTO> cartItemsDTO);

    Optional<CartItemDTO> getCartItemDTOByCode(String userName, String code);

    CartItem saveInDetail(CartItem cartItem);

    CartItem saveOp(CartItem cartItem);

    CartItem doReduce(CartItem cartItem);
    CartItem doIncreasing(CartItem cartItem);
}

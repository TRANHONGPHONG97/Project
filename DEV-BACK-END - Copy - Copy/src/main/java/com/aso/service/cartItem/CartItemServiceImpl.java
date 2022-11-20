package com.aso.service.cartItem;


import com.aso.exception.DataInputException;
import com.aso.exception.DataOutputException;
import com.aso.model.*;
import com.aso.model.dto.CartDTO;
import com.aso.model.dto.CartItemDTO;
import com.aso.model.dto.StatusDTO;
import com.aso.repository.CartItemRepository;
import com.aso.repository.ProductRepository;
import com.aso.repository.StatusRepository;
import com.aso.service.account.AccountService;
import com.aso.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private AccountService accountService;
    @Autowired
    private StatusRepository statusRepository;

    @Override
    public List<CartItem> findAll() {
        return null;
    }

    @Override
    public Optional<CartItem> findById(Long id) {
        return cartItemRepository.findById ( id );
    }

    @Override
    public Optional<CartItem> findByProductId(Long productId) {
        return cartItemRepository.findByProductId ( productId );
    }

    @Override
    public List<CartItem> findAllByCart(Cart cart) {
        return cartItemRepository.findAllByCart ( cart );
    }

    @Override
    public BigDecimal getSumAmountByCartId(Long cartId) {
        return cartItemRepository.getSumAmountByCartId ( cartId );
    }

    @Override
    public List<CartItemDTO> findAllCartItemsDTO(Long cartId) {
        return cartItemRepository.findAllCartItemsDTO ( cartId );
    }

    @Override
    public CartItem getById(Long id) {
        return null;
    }

    @Override
    public void softDelete(CartItem cartItem) {

    }

    @Override
    public List<CartItemDTO> findCartItemDTOByEmail(String email) {
        return cartItemRepository.findCartItemDTOByEmail ( email );
    }

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save ( cartItem );
    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public Optional<CartItemDTO> getCartItemDTOById(Long id) {
        return cartItemRepository.getCartItemDTOById ( id );
    }


    @Override
    public CartItem doSaveCartItem(Long accountId, CartItemDTO cartItemDTO) {
        Optional<Account> accountOptional = accountService.findById ( accountId );

        Optional<Product> product = productRepository.findBySlug ( cartItemDTO.getProduct ().getSlug () );


        Optional<CartDTO> cartDTOOptional = cartService.findCartDTOByIdAccountInfo ( accountId );

        if ( !cartDTOOptional.isPresent () ) {
            Cart cart = new Cart ();
            StatusDTO status = statusRepository.findStatusDTOById ( 2L );
            cart.setAccount ( accountOptional.get () );
            cart.setStatus ( status.toStatus () );
            try {
                cartItemDTO.setCart ( cartService.save ( cart ).toCartDTO () );
            }catch (Exception e) {
                throw new DataOutputException ( e.getMessage () );
            }

        } else {
            cartItemDTO.setCart ( cartDTOOptional.get () );
        }

        Optional<CartItemDTO> cartItemDTOOptional = cartItemRepository.getCartItemDTOByProductAndAccount ( cartItemDTO.getCart ().getAccount ().getId (), cartItemDTO.getProduct ().getId () );
        if ( cartItemDTOOptional.isPresent () ) {
            cartItemDTO.setId ( cartItemDTOOptional.get ().getId () );
            cartItemDTO.setQuantity ( cartItemDTOOptional.get ().getQuantity () + cartItemDTO.getQuantity () );
        }

        if ( product.get ().getAction () ) {
            cartItemDTO.setAmountTransaction (cartItemDTO.getPrice () );
        } else {
            cartItemDTO.setPrice ( product.get ().getPrice () );
            cartItemDTO.setAmountTransaction ( product.get ().getPrice ().multiply ( BigDecimal.valueOf ( cartItemDTO.getQuantity () ) ) );
        }
        cartItemDTO.setProduct ( product.get ().toProductDTO () );

        try {
            return cartItemRepository.save ( cartItemDTO.toCartItem () );
        } catch (Exception e) {
            throw new RuntimeException (e.getMessage ());
        }
    }

    @Override
    public void removeById(CartItem cartItem) {

    }

    @Override
    public List<CartItemDTO> doRemoveCartItems(String email, List<CartItemDTO> cartItemsDTO) {

        for (CartItemDTO cartItem : cartItemsDTO) {
            Optional<CartItem> cartItemOptional = cartItemRepository.findById ( cartItem.getId () );
            if ( !cartItemOptional.isPresent () ) {
                throw new Error ( "Sản phẩm " + cartItem.getTitle () + " không tồn tại trong giỏ hàng." );
            }
            CartItem newCartItem = cartItemOptional.get ();
            newCartItem.setDeleted ( true );
            cartItemRepository.save ( newCartItem );
        }

        return cartItemRepository.findCartItemDTOByEmail ( email );
    }

    @Override
    public Optional<CartItemDTO> getCartItemDTOByCode(String title, String code) {
        return null;
    }

    @Override
    public CartItem saveInDetail(CartItem cartItem) {
        return null;
    }

    @Override
    public CartItem saveOp(CartItem cartItem) {
        return null;
    }

    @Override
    public CartItem doReduce(CartItem cartItem) {

        int currentQuantity = cartItem.getQuantity ();

        cartItem.setQuantity ( currentQuantity - 1 );
        cartItem.setAmountTransaction ( cartItem.getPrice ().multiply ( BigDecimal.valueOf ( cartItem.getQuantity () ) ) );
        try {
            return cartItemRepository.save ( cartItem );
        } catch (Exception e) {
            throw new DataInputException ( e.getMessage () );
        }
    }

    @Override
    public CartItem doIncreasing(CartItem cartItem) {

        int currentQuantity = cartItem.getQuantity ();

        cartItem.setQuantity ( currentQuantity + 1 );
        cartItem.setAmountTransaction ( cartItem.getPrice ().multiply ( BigDecimal.valueOf ( cartItem.getQuantity () ) ) );
        try {
            return cartItemRepository.save ( cartItem );
        } catch (Exception e) {
            throw new DataInputException ( e.getMessage () );
        }
    }
}

package com.aso.controller.api;

import com.aso.exception.AccountInputException;
import com.aso.exception.AttributesExistsException;
import com.aso.exception.DataInputException;
import com.aso.exception.DataOutputException;
import com.aso.model.Account;
import com.aso.model.Cart;
import com.aso.model.CartItem;
import com.aso.model.Product;
import com.aso.model.dto.CartItemDTO;
import com.aso.service.account.AccountService;
import com.aso.service.cart.CartService;
import com.aso.service.cartItem.CartItemService;
import com.aso.service.product.ProductService;
import com.aso.utils.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemsAPI {
    @Autowired
    private CartItemService cartItemService;
    @Autowired
    private AppUtil appUtils;

    @Autowired
    private CartService cartService;

    @Autowired
    private AccountService accountService;
    @Autowired
    private ProductService productService;

    @GetMapping("/{email}")
    public ResponseEntity<?> getCartByAccountId(@PathVariable String email) {
        try {
            Optional<Account> accountOptional = accountService.getByEmail ( email );
            if ( !accountOptional.isPresent () ) {
                throw new AccountInputException ( "Tài khoản không tồn tại!" );
            }
            List<CartItemDTO> cartItemsDTO = cartItemService.findCartItemDTOByEmail(email);
            return new ResponseEntity<>(cartItemsDTO, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("Không lấy được danh sách sản phảm trong giỏ hàng");
        }
    }
    @GetMapping("/get-by-cart-id/{cartId}")
    public ResponseEntity<?> getCartItemByCartId(@PathVariable Long cartId) {
        List<CartItemDTO> cartItemDTOList = new ArrayList<> ();
        try {
            Optional<Cart> cartOptional = cartService.findById ( cartId );
            if ( !cartOptional.isPresent () ) {
                throw new DataInputException ( "Giỏ hàng không tồn tại!" );
            }
            List<CartItem> cartItems = cartItemService.findAllByCart (cartOptional.get ());
            for (CartItem cartItem: cartItems) {
                cartItemDTOList.add ( cartItem.toCartItemListDTO () );
            }
            return new ResponseEntity<>(cartItemDTOList, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("Không lấy được danh sách sản phảm trong giỏ hàng");
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getCartById(@PathVariable Long id) {
        try {
            Optional<CartItemDTO> cartItemsDTO = cartItemService.getCartItemDTOById(id);
            return new ResponseEntity<>(cartItemsDTO.get(), HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity<>("Không lấy được cart item", HttpStatus.NO_CONTENT);
        }
    }
    @GetMapping("/reduce/{cartItemId}")
    public ResponseEntity<?> reduceCartItem(@PathVariable Long cartItemId) {
        List<String> errors = new ArrayList<> ();
        try {
            Optional<CartItem> cartItemOptional = cartItemService.findById ( cartItemId );
            if ( !cartItemOptional.isPresent () ) {
                throw new DataOutputException ( "Không tồn tại sản phẩm này trong giỏ hàng" );
            }

            int currentQuantity = cartItemOptional.get ().getQuantity ();
            boolean checkQuantity = (currentQuantity - 1) < 1;

            if ( checkQuantity ) {
                errors.add ( "Số lượng đặt hàng không hợp lệ" );
                return new ResponseEntity<>( errors, HttpStatus.BAD_REQUEST);
            }

            CartItem newCartItem = cartItemService.doReduce ( cartItemOptional.get () );
            return new ResponseEntity<>( newCartItem.toCartItemListDTO () , HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity<> ( e.getMessage (), HttpStatus.BAD_REQUEST );
        }
    }
    @GetMapping("/increasing/{cartItemId}")
    public ResponseEntity<?> increasingCartItem(@PathVariable Long cartItemId) {
        try {
            Optional<CartItem> cartItemOptional = cartItemService.findById ( cartItemId );
            if ( !cartItemOptional.isPresent () ) {
                throw new DataOutputException ( "Không tồn tại sản phẩm này trong giỏ hàng" );
            }

            Product product = cartItemOptional.get ().getProduct ();

            int currentQuantity = cartItemOptional.get ().getQuantity ();
            boolean checkQuantity = (currentQuantity + 1) > product.getAvailable ();

            if ( checkQuantity ) {
                return new ResponseEntity<>("Số lượng cần mua không thể lớn hơn số lượng sản phẩm còn lại", HttpStatus.NO_CONTENT);
            }

            CartItem newCartItem = cartItemService.doIncreasing ( cartItemOptional.get () );
            return new ResponseEntity<>(newCartItem.toCartItemListDTO () , HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity<>("Không thể giảm số lượng sản phẩm", HttpStatus.NO_CONTENT);
        }
    }
    @PutMapping("/remove/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId) {
        try {
            Optional<CartItem> cartItemOptional = cartItemService.findById ( cartItemId );
            if ( !cartItemOptional.isPresent () ) {
                throw new DataOutputException ( "Không tồn tại sản phẩm này trong giỏ hàng" );
            }
            CartItem newCartItem = cartItemOptional.get ();

            newCartItem.setDeleted ( true );
            cartItemService.save ( newCartItem );

            List<CartItemDTO> cartItemsDTO = cartItemService.findCartItemDTOByEmail (newCartItem.getCart ().getAccount ().getEmail ());

            return new ResponseEntity<>(cartItemsDTO , HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity<>("Không thể xóa sản phẩm ra khỏi giỏ hàng", HttpStatus.NO_CONTENT);
        }
    }
    @PutMapping("/remove-list/{email}")
    public ResponseEntity<?> removeCartItems(@PathVariable String email, @RequestBody List<CartItemDTO> cartItems) {
        try {
            Optional<Account> accountOptional = accountService.getByEmail ( email );
            if ( !accountOptional.isPresent () ) {
                return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.NO_CONTENT);
            }
            if ( cartItems.isEmpty () ) {
                return new ResponseEntity<>("Danh sách rỗng", HttpStatus.NO_CONTENT);
            }
            List<CartItemDTO> newCartItems = cartItemService.doRemoveCartItems ( email, cartItems );

            return new ResponseEntity<>( newCartItems, HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity<>("Không thể thực hiện thao tác", HttpStatus.NO_CONTENT);
        }
    }

    @PostMapping("/create/{accountId}")
    public ResponseEntity<?> doCreateCart(@PathVariable("accountId") Long accountId, @RequestBody CartItemDTO cartItemsDTO, BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }
        try {
            Optional<Account> accountOptional = accountService.findById ( accountId );
            if(!accountOptional.isPresent ()) {
                throw new AccountInputException ( "Tài khoản không tồn tại" );
            }

            Optional<Product> productOptional = productService.findProductBySlug ( cartItemsDTO.getProduct ().getSlug () );
            if(!productOptional.isPresent ()) {
                throw new DataInputException ( "Sản phẩm không tồn tại" );
            }

            if ( Objects.equals ( accountOptional.get ().getEmail (), productOptional.get ().getCreatedBy () ) ) {
                throw new AttributesExistsException ( "Không thể mua sản phẩm của bạn" );
            }

            CartItem cartItem = cartItemService.doSaveCartItem ( accountId, cartItemsDTO );
            return new ResponseEntity<>(cartItem.toCartItemListDTO (), HttpStatus.CREATED);
        } catch (Exception e) {
            throw new DataOutputException (e.getMessage ());
        }
    }
}

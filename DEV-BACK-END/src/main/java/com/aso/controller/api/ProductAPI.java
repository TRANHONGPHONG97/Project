package com.aso.controller.api;

import com.aso.exception.AccountInputException;
import com.aso.exception.DataInputException;
import com.aso.exception.DataOutputException;
import com.aso.exception.ResourceNotFoundException;
import com.aso.model.*;
import com.aso.model.dto.*;
import com.aso.model.enums.AuctionType;
import com.aso.model.enums.ItemStatus;
import com.aso.service.account.AccountService;
import com.aso.service.auction.AuctionService;
import com.aso.service.bid.BidService;
import com.aso.service.product.ProductService;

import com.aso.service.productMedia.ProductMediaService;
import com.aso.utils.AppUtil;
import com.aso.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/products")
public class ProductAPI {

    @Autowired
    private AccountService accountService;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductMediaService productMediaService;
    @Autowired
    private AuctionService auctionService;
    @Autowired
    private Validation validation;
    @Autowired
    private AppUtil appUtil;
    @Autowired
    private BidService bidService;

    @GetMapping()
    public ResponseEntity<?> getAllProducts() {
        List<ProductDTO> productDTOList = productService.findAllProductsDTO ();

        if ( productDTOList.isEmpty () ) {
            throw new DataOutputException ( "Không có dữ liệu" );
        }

        return new ResponseEntity<> ( productDTOList, HttpStatus.OK );
    }

    @GetMapping("/get-moderated-by-created-by/{createdBy}")
    public ResponseEntity<?> getProductsModerationByCreatedBy(@PathVariable String createdBy) {
        try {
            Optional<Account> accountOptional = accountService.getByEmail ( createdBy );

            if ( !accountOptional.isPresent () ) {
                throw new AccountInputException ( "Tài khoản không tồn tại" );
            }

            List<ProductDTO> productDTOList = productService.getProductsDTOModeratedByCreatedBy ( createdBy );

            if ( productDTOList.isEmpty () ) {
                throw new DataInputException ( "Không có dữ liệu" );
            }

            return new ResponseEntity<> ( productDTOList, HttpStatus.OK );
        } catch (Exception e) {
            throw new DataOutputException ( e.getMessage () );
        }
    }

    @GetMapping("/auctions")
    public ResponseEntity<?> getAllProductsAuctions() {
        List<ProductDTO> productDTOList = productService.findAllProductsDTOAuctions ();
        if ( productDTOList.isEmpty () ) {
            throw new DataOutputException ( "Danh sách sản phẩm theo đấu giá trống!" );
        }
        return new ResponseEntity<> ( productDTOList, HttpStatus.OK );
    }

    @GetMapping("/the-shops")
    public ResponseEntity<?> getAllProductsTheShop() {
        List<ProductDTO> productDTOList = productService.findAllProductsDTOTheShop ();
        if ( productDTOList.isEmpty () ) {
            throw new DataOutputException ( "Danh sách sản phẩm theo cửa hàng trống!" );
        }
        return new ResponseEntity<> ( productDTOList, HttpStatus.OK );
    }

    @GetMapping("/moderation")
    public ResponseEntity<?> getAllProductsModeration() {
        List<ProductListDTO> productDTOList = productService.findAllProductListDTOModeration ();

        if ( productDTOList.isEmpty () ) {
            return new ResponseEntity<> ( productDTOList, HttpStatus.OK );
        }
        return new ResponseEntity<> ( productDTOList, HttpStatus.OK );
    }

    @GetMapping("/p")
    public ResponseEntity<Page<ProductDTO>> getAllBooks(Pageable pageable) {

        String email = appUtil.getPrincipalEmail();
        Page<ProductDTO> productDTOList = productService.findAllProducts(pageable);
        return new ResponseEntity<>(productDTOList, HttpStatus.OK);
    }

    @GetMapping("/c")
    public ResponseEntity<Page<ProductDTO>> getAllProductsSort(Pageable pageable, Integer pageNumber, Integer pageSize, String sortBy, String sortDir) {
        Page<ProductDTO> productDTOList = productService.findAllProducts ( pageable );
        if ( productDTOList.isEmpty () ) {
            throw new DataOutputException ( "Danh sách sản phẩm trống" );
        }
        return new ResponseEntity<> ( productService.findAllProducts ( PageRequest.of (
                        pageNumber, pageSize,
                        sortDir.equalsIgnoreCase ( "asc" ) ? Sort.by ( sortBy ).ascending () : Sort.by ( sortBy ).descending ()
                )
        ), HttpStatus.OK );
    }

    @GetMapping("/p/{keyword}")
    public ResponseEntity<Page<ProductDTO>> getAllBookss(Pageable pageable, @PathVariable("keyword") String keyword) {
        try {
            keyword = "%" + keyword + "%";

            Page<ProductDTO> productDTOList = productService.findAllProductss(pageable, keyword);
            return new ResponseEntity<>(productDTOList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<> ( HttpStatus.BAD_REQUEST );
        }
    }

    @GetMapping("/trash")
    public ResponseEntity<?> getAllProductsTrash() {
        List<ProductDTO> products = productService.findAllProductsDTOTrash ();
        if ( products.isEmpty () ) {
            throw new DataOutputException ( "Danh sách sản phẩm trống!" );
        }
        return new ResponseEntity<> ( products, HttpStatus.OK );
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable String productId) {

        if ( !validation.isIntValid ( productId ) ) {
            throw new DataInputException ( "Id sản phẩm không tồn tại!" );
        }
        Long product_id = Long.parseLong ( productId );
        Optional<Product> productOptional = productService.findById ( product_id );
        if ( !productOptional.isPresent () ) {
            throw new ResourceNotFoundException ( "Danh sách sản phẩm trống!" );
        }
        return new ResponseEntity<> ( productOptional.get ().toProductDTO (), HttpStatus.OK );
    }

    @GetMapping("/find-by-slug/{slug}")
    public ResponseEntity<?> getProductBySlug(@PathVariable String slug) {

        Optional<Product> productOptional = productService.findBySlug ( slug );

        if ( !productOptional.isPresent () ) {
            throw new ResourceNotFoundException ( "Sản phẩm không tồn tại" );
        }
        return new ResponseEntity<> ( productOptional.get ().toProductDTO (), HttpStatus.OK );
    }

    @PostMapping("/create")
    public ResponseEntity<?> doCreate(@Validated @RequestBody ProductDTO productDTO, BindingResult bindingResult) {

        String email = appUtil.getPrincipalEmail ();
        Optional<Account> account = accountService.getByEmail(email);
        if ( bindingResult.hasErrors () ) {
            return appUtil.mapErrorToResponse ( bindingResult );
        }
        account.get().setSurplus(account.get().getSurplus().subtract(productDTO.getCheatMoney()));
        accountService.editAccount(account.get());
        if (account.get().getSurplus().compareTo(BigDecimal.ZERO) < 0) {
            throw new ResourceNotFoundException("Số dư tài khoản không đủ! Vui lòng nạp thêm tiền");
        }
        String checkPrice = String.valueOf ( new BigDecimal ( String.valueOf ( productDTO.getPrice () ) ) );
        if ( !checkPrice.toString ().matches ( "\"(^$|[0-9]*$)\"" ) ) {
            productDTO.setSlug ( Validation.makeSlug ( productDTO.getTitle ()) + "-" + productDTO.getTs () );
            productDTO.setId ( 0L );
            productDTO.setCreatedBy ( email );
            productDTO.toProduct ().setDeleted ( false );
            productDTO.setImages ( productDTO.getImages () );
            if ( !productDTO.getAction () ) {
                productDTO.setCountday ( null );
            }
            if ( productDTO.getAction () ) {
                productDTO.setAvailable ( 1L );
            }
            Product newProduct = productService.save ( productDTO.toProduct () );
            for (String p : productDTO.getImages ()) {
                ProductMedia productMedia = new ProductMedia ();
                productMedia.setId ( 0L );
                productMedia.setFileUrl ( p );
                productMediaService.save ( productMedia );
            }
            return new ResponseEntity<> ( newProduct.toProductDTO (), HttpStatus.CREATED );
        }
        throw new DataInputException ( "Tạo mới thất bại" );
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> doEdit(@PathVariable Long id, @Validated @RequestBody ProductDTO productDTO,
                                    BindingResult bindingResult) {
        String email = appUtil.getPrincipalEmail ();
        if ( bindingResult.hasErrors () ) {
            return appUtil.mapErrorToResponse ( bindingResult );
        }

        Optional<Product> p = productService.findById ( id );
        if ( !p.isPresent () ) {
            return new ResponseEntity<> ( "Không tồn tại sản phẩm", HttpStatus.NOT_FOUND );
        }
        try {
            String slug = Validation.makeSlug(productDTO.getTitle());
            p.get().setUpdatedAt(new Date());
            p.get().setUpdatedBy(email);
            p.get().setAction(productDTO.getAction());
            p.get().setAvailable(productDTO.getAvailable());
            p.get().setImage(productDTO.getImage());
            p.get().setPrice(productDTO.getPrice());
            p.get().setSlug(slug);
            p.get().setTitle(productDTO.getTitle());
            p.get().setCategory(productDTO.toProduct().getCategory());
            p.get().setDescription(productDTO.getDescription());
            p.get().setCountday(productDTO.getCountday());
            if (productDTO.getAction()) {
                p.get().setCountday(null);
            }
            for (String pr : productDTO.getImages ()) {
                ProductMedia productMedia = new ProductMedia ();
                productMedia.setId ( 0L );
                productMedia.setFileUrl ( pr );
                productMediaService.save ( productMedia );
            }
            Product newProduct = productService.save ( p.get () );
            return new ResponseEntity<> ( newProduct.toProductDTO (), HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity<> ( "Lỗi của hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @PutMapping("/moderation/{id}")
    public ResponseEntity<?> doModeration(@PathVariable Long id) {
        String email = appUtil.getPrincipalEmail ();
        Optional<Product> p = productService.findById ( id );
        if ( !p.isPresent () ) {
            return new ResponseEntity<> ( "Không tồn tại sản phẩm", HttpStatus.NOT_FOUND );
        }
        try {
            p.get().setModeration(true);
            p.get().setUpdatedBy(email);
            Product newProduct = productService.save(p.get());

            AccountDTO accountDTO = accountService.findAccountByEmail(email);
            if (p.get().getAction()) {
                AuctionDTO auction = new AuctionDTO();
                auction.setId(0L);
                auction.setEmail(newProduct.getCreatedBy());
                auction.setCreatedAt(new Date());
                auction.setCreatedBy(newProduct.getCreatedBy());
                auction.setAccount(accountDTO);
                auction.setProduct(p.get().toProductDTO());
                auction.setAuctionType(AuctionType.BIDDING);
                auction.setItemStatus(ItemStatus.NEW);
                auction.setStartingPrice(p.get().getPrice());
                auction.setCurrentPrice(p.get().getPrice());
                auction.setAuctionStartTime(new Date());
                Date dt = new Date();
                Calendar c = Calendar.getInstance();
                c.setTime(dt);
//                c.add(Calendar.DATE, Integer.parseInt(p.get().getCountday()));
                c.add(Calendar.MINUTE, 5);
                dt = c.getTime ();
                auction.setAuctionEndTime ( dt );
                auction.setDaysToEndTime ( Integer.parseInt ( p.get ().getCountday () ) );
                Auction auc = auctionService.createAuction ( auction );
                Bid bid = new Bid ();
                bid.setCreatedBy ( newProduct.getCreatedBy() );
                bid.setAccount ( accountDTO.toAccount () );
                bid.setAuction ( auc );
                bid.setBidPrice ( p.get ().getPrice () );
                bid.setEmail (newProduct.getCreatedBy());
                bid.setEstimatePrice ( p.get ().getEstimatePrice () );
                bidService.save ( bid );
            }
            return new ResponseEntity<> ( newProduct.toProductDTO (), HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity<> ( "Lỗi của hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @PutMapping("/delete-soft/{id}")
    public ResponseEntity<?> doDelete(@PathVariable Long id) {
        Optional<Product> optionalProduct = productService.findById ( id );
        if ( optionalProduct.isPresent () ) {
            productService.softDelete ( optionalProduct.get () );
            return new ResponseEntity<> ( "Đã xóa thành công!", HttpStatus.OK );
        } else {
            return new ResponseEntity<> ( "Đã xóa thất bại!", HttpStatus.BAD_REQUEST );
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws IOException {
        Optional<Product> product = productService.findById ( id );
        if ( product.isPresent () ) {
            productService.delete ( product.get () );
            return new ResponseEntity<> ( HttpStatus.ACCEPTED );
        } else {
            throw new DataInputException ( "Đã xóa thất bại" );
        }
    }

    @GetMapping("/search/{title}")
    public ResponseEntity<?> searchProductTitle(@PathVariable String title) {
        List<ProductDTO> productDTOList = productService.findAllBySearchTitle ( title );
        return new ResponseEntity<> ( productDTOList, HttpStatus.OK );
    }

    @PutMapping("/update/{slug}")
    public ResponseEntity<?> update(@PathVariable String slug, @Validated ProductDTO productDTO, BindingResult bindingResult) {
        if ( bindingResult.hasErrors () )
            return appUtil.mapErrorToResponse ( bindingResult );

        Optional<Product> product = productService.findProductBySlug ( slug );

        if ( !product.isPresent () ) {
            throw new DataInputException ( "Id sản phẩm không tìm thấy!" );
        }
        productDTO.setId ( product.get ().getId () );

        try {
            productDTO.getCategory ().setTitle ( product.get ().getCategory ().getTitle () );
            productDTO.setId ( product.get ().getId () );
            productService.save ( productDTO.toProduct () );

            return new ResponseEntity<> ( productDTO, HttpStatus.OK );

        } catch (Exception e) {
            return new ResponseEntity<> ( "Lỗi của hệ thống", HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    @GetMapping("/product-status-available")
    private ResponseEntity<?> findAllProductAvailable() {
        try {
            List<ProductDTO> productDTOS = productService.findAllProductDTOByAvailable ( "Sản phẩm hiện đang còn hàng" );
            return new ResponseEntity<> ( productDTOS, HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity<> ( HttpStatus.BAD_REQUEST );
        }
    }

    @GetMapping("/find-by-sold")
    public ResponseEntity<?> getTopProductBySold() {

        List<ProductDTO> productDTOList = new ArrayList<>();
        List<ProductDTO> products = productService.findTopProductBySold();

        if ( products.isEmpty () ) {
            throw new ResourceNotFoundException ( "Sản phẩm không tồn tại!" );
        }
        for(int i = 0; i < 5; i++){
            productDTOList.add(products.get(i));
        }

        return new ResponseEntity<> (productDTOList, HttpStatus.OK );
    }
}

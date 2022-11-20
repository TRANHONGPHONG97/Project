package com.aso.controller.api;

import com.aso.exception.*;
import com.aso.model.Account;
import com.aso.model.Auction;
import com.aso.model.Product;
import com.aso.model.dto.AuctionDTO;
import com.aso.model.dto.BidDTO;
import com.aso.service.account.AccountService;
import com.aso.service.auction.AuctionService;
import com.aso.service.bid.BidService;
import com.aso.service.product.ProductService;
import com.aso.utils.AppUtil;
import com.aso.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auctions")
public class AuctionAPI {

    @Autowired
    private AppUtil appUtil;
    @Autowired
    private AuctionService auctionService;

    @Autowired
    private BidService bidService;

    @Autowired
    private Validation validation;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ProductService productService;

    @PostMapping("")
    public ResponseEntity<Auction> createAuction(
            @RequestBody @Valid AuctionDTO auctionDTO) {
        return new ResponseEntity<>(auctionService.createAuction(auctionDTO),
                HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllAuctions() {
        List<AuctionDTO> auctionDTOS = auctionService.getAllAuctions();

        if (auctionDTOS.isEmpty()) {
            throw new DataOutputException("Danh sách đấu giá trống!");
        }

        return new ResponseEntity<>(auctionDTOS, HttpStatus.OK);
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<?> getAuctionById(@PathVariable String auctionId) {

        if (!validation.isIntValid(auctionId)) {
            throw new DataInputException("ID phiên đấu giá không tồn tại!");
        }

        Long auction_id = Long.parseLong(auctionId);
        Optional<Auction> auctionOptional = auctionService.findById(auction_id);

        if (!auctionOptional.isPresent ()) {
            throw new ResourceNotFoundException("Phiên đấu giá không tồn tại");
        }
        return new ResponseEntity<>(auctionOptional.get().toAuctionDTO(), HttpStatus.OK);
    }


    @GetMapping("/auction/{productId}")
    public ResponseEntity<?> getAuctionByProductId(@PathVariable Long productId) {
        Optional<AuctionDTO> auctionDTO = auctionService.findByAuctionByProductId(productId);

        if (!auctionDTO.isPresent ()) {
            throw new ResourceNotFoundException("Phiên đấu giấ không tồn tại!");
        }
        return new ResponseEntity<>(auctionDTO.get(), HttpStatus.OK);
    }

    @PutMapping("/delete-soft/{auctionId}")
    public ResponseEntity<?> doDelete(@PathVariable Long auctionId) {

        Auction auctionToDelete = auctionService.findById(auctionId).orElseThrow(
                () -> new ResourceNotFoundException("Phiếu mua hàng có id " + auctionId + " không tồn tại!"));

        if (auctionToDelete.getAuctionEndTime().before(new Date())) {
            throw new IncorrectDateException(
                    "Không thể xóa phiên đấu giá đã kết thúc!");
        }

        List<BidDTO> bidsForAuctionCount = bidService.findByRelatedOfferId(auctionId);

        if (!bidsForAuctionCount.isEmpty()) {
            throw new IncorrectOperationException(
                    "Không thể xóa đấu giá có giá thầu!");
        }
        auctionService.softDelete(auctionToDelete);
        return new ResponseEntity<>("Đã xóa thành công!", HttpStatus.OK);
    }

    @PutMapping("/edit/{auctionId}")
    public ResponseEntity<?> doEdit(@PathVariable Long auctionId, @Validated @RequestBody AuctionDTO auctionDTO,
                                    BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            return appUtil.mapErrorToResponse(bindingResult);
        }

        Optional<Auction> auction = auctionService.findById(auctionId);
        if (!auction.isPresent ()) {
            return new ResponseEntity<>("Phiên đấu giá không tồn tại!", HttpStatus.NOT_FOUND);
        }

        Optional<Account> account = accountService.findById(auctionDTO.getAccount().getId());
        if (!account.isPresent ()) {
            return new ResponseEntity<>("Tài khoản không tồn tại!", HttpStatus.NOT_FOUND);
        }
        Optional<Product> product = productService.findById(auctionDTO.getProduct().getId());
        if (!product.isPresent ()) {
            return new ResponseEntity<>("Sản phẩm không tồn tại!", HttpStatus.NOT_FOUND);
        }

        try {
            auction.get().setUpdatedAt(new Date());
            auction.get().setEmail(auctionDTO.getEmail());
            auction.get().setAccount(account.get());
            auction.get().setProduct(product.get());
            auction.get().setAuctionType(auctionDTO.getAuctionType());
            auction.get().setItemStatus(auctionDTO.getItemStatus());
            auction.get().setStartingPrice(auctionDTO.getStartingPrice());
            auction.get().setCurrentPrice(auctionDTO.getCurrentPrice());
            auction.get().setAuctionEndTime(auctionDTO.getAuctionEndTime());
            auction.get().setAuctionStartTime(auctionDTO.getAuctionStartTime());
            auction.get().setDaysToEndTime(auctionDTO.getDaysToEndTime());

            Auction newAuction = auctionService.save(auction.get());

            return new ResponseEntity<>(newAuction.toAuctionDTO(), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi của hệ thống!", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/p")
    public ResponseEntity<Page<AuctionDTO>> getAllAuctions(Pageable pageable) {
        Page<AuctionDTO> auctionDTOPage = auctionService.findAllAuctions(pageable);
        if (auctionDTOPage.isEmpty()) {
            throw new DataOutputException("Danh sách phiên đấu giá trống!");
        }
        return new ResponseEntity<>(auctionDTOPage, HttpStatus.OK);
    }

    @GetMapping("/p/{keyword}")
    public ResponseEntity<Page<AuctionDTO>> getAllAuctionsSearch(Pageable pageable, @PathVariable("keyword") String keyword) {
        try {
            keyword = "%" + keyword + "%";
            Page<AuctionDTO> auctionDTOPage = auctionService.findAllAuctionss(pageable, keyword);
            if (auctionDTOPage.isEmpty()) {
                throw new DataOutputException("Danh sách phiên đấu giá trống!");
            }
            return new ResponseEntity<>(auctionDTOPage, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}

package com.aso.service.bid;

import com.aso.exception.*;
import com.aso.model.Account;
import com.aso.model.Auction;
import com.aso.model.Product;
import com.aso.model.enums.AuctionType;
import com.aso.model.Bid;
import com.aso.model.dto.BidDTO;
import com.aso.repository.AuctionRepository;
import com.aso.repository.BidRepository;
import com.aso.service.account.AccountService;
import com.aso.utils.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BidServiceImpl implements BidService {
    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private AccountService accountService;

    @Autowired
    private AppUtil appUtil;

    @Override
    public Bid createBid(BidDTO bidDTO) {
        try {
            String email = appUtil.getPrincipalEmail();
            if (email.equals("anonymousUser")) {
                throw new ResourceNotFoundException("Bạn phải đăng nhập để thực hiện thao tác này");
            }
            Optional<Account> account = accountService.findById(bidDTO.getAccount().getId());
            if (!account.isPresent ()) {
                throw new DataInputException("Tài khoản không tồn tại!");
            }
            Optional<Auction> auction = auctionRepository.findById(bidDTO.getAuction().getId());
            if (!auction.isPresent ()) {
                throw new DataInputException("Phiên đấu giá không tồn tại!");
            }
            List<BidDTO> bidDTOList = bidRepository.findByRelatedOfferId(bidDTO.getAuction().getId());
            bidDTOList.get(0);
            if (bidDTOList.get(0).getCreatedBy().equals(email)) {
                throw new RuntimeException("Bạn không được đấu giá 2 lần cùng một lúc!");
            }

            bidDTO.setAccount(account.get().toAccountDTO());

            if ( account.get ().getEmail ().equals ( auction.get ().getProduct ().getCreatedBy () ) ) {
                throw new DataInputException ( "Không thể tham gia đấu giá với sản phẩm của bạn!" );
            }

            bidDTO.setAccount ( account.get ().toAccountDTO () );
            bidDTO.setAuction ( auction.get ().toAuctionDTO () );

            Bid bid = bidDTO.toBid ();

            Bid savedBid = null;

            if ( auction.get ().getAuctionType ().equals ( AuctionType.BUY_NOW ) ) {
                throw new IncorrectAuctionTypeException ( "Không thể đặt giá thầu trên đấu giá mua ngay bây giờ!" );
            }
            if (bid.getBidPrice().compareTo(auction.get().getCurrentPrice()) <= 0) {
                throw new IncorrectPriceException(
                        "Giá đấu thầu phải lớn hơn giá hiện tại!");
            }
            if ( new Date ().after ( auction.get ().getAuctionEndTime () ) ) {
                throw new IncorrectDateException ( "Phiên đấu giá đã kết thúc!" );
            }

            auction.get ().setCurrentPrice ( bid.getBidPrice () );
            auction.get ().setAuctionType ( AuctionType.BIDDING );
            auctionRepository.save ( auction.get () );
            bid.setCreatedBy ( email );
            bid.setAuction ( auction.get () );
            savedBid = bidRepository.save ( bid );

            return savedBid;
        } catch (Exception e) {
            throw new ResourceNotFoundException ( e.getMessage () );
        }
    }


    @Override
    public Iterable<Bid> findAll() {
        return null;
    }

    @Override
    public Optional<Bid> findById(Long id) {
        return Optional.empty ();
    }

    @Override
    public void removeById(Bid bid) {

    }

    @Override
    public Bid save(Bid bid) {
        return bidRepository.save ( bid );
    }

    @Override
    public Bid getById(Long id) {
        return null;
    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public void softDelete(Bid bid) {
        bid.setDeleted ( true );
        bidRepository.save ( bid );
    }

    @Override
    public Bid deleteBid(Long auctionId, Long bidId) {
        return null;
    }

    @Override
    public List<BidDTO> findByRelatedOfferId(Long id) {
        return bidRepository.findByRelatedOfferId(id);
    }

    @Override
    public List<BidDTO> getAllBids() {
        return bidRepository.getAllBids ();
    }
}

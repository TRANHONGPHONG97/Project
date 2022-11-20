package com.aso.repository;

import com.aso.model.Bid;
import com.aso.model.dto.BidDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {

     @Query(value = "SELECT MAX (bid_price) FROM bids WHERE auction_id = ?1", nativeQuery = true)
     BigDecimal getBidPriceMax(Long auctionId);

     @Query("SELECT NEW com.aso.model.dto.BidDTO (" +
             "b.id, " +
             "b.createdAt, " +
             "b.createdBy, " +
             "b.email, " +
             "b.bidPrice, " +
             "b.estimatePrice, " +
             "b.account, " +
             "b.auction, " +
             "b.deleted " +
             ") " +
             "FROM Bid AS b WHERE b.deleted = false ")
     List<BidDTO> getAllBids();

     @Query("SELECT NEW com.aso.model.dto.BidDTO (" +
             "b.id, " +
             "b.createdAt, " +
             "b.createdBy, " +
             "b.email, " +
             "b.bidPrice, " +
             "b.estimatePrice, " +
             "b.account, " +
             "b.auction, " +
             "b.deleted " +
             ") " +
             "FROM Bid AS b WHERE b.deleted = false AND b.bidPrice = 0")
     List<BidDTO> getAllBidsByBidPrice(Long id);

     @Query("SELECT NEW com.aso.model.dto.BidDTO (" +
             "b.id, " +
             "b.createdAt, " +
             "b.createdBy, " +
             "b.email, " +
             "b.bidPrice, " +
             "b.estimatePrice, " +
             "b.account, " +
             "b.auction, " +
             "b.deleted " +
             ") " +
             "FROM Bid AS b WHERE b.deleted = false AND b.auction.id = ?1 ORDER BY b.id DESC")
     List<BidDTO> findByRelatedOfferId(Long id);
}
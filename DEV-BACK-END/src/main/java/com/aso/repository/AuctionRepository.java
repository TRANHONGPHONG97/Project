package com.aso.repository;

import com.aso.model.Auction;
import com.aso.model.dto.AuctionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    @Query("SELECT NEW com.aso.model.dto.AuctionDTO (" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.email, " +
            "a.account, " +
            "a.product, " +
            "a.auctionType, " +
            "a.itemStatus, " +
            "a.startingPrice, " +
            "a.currentPrice, " +
            "a.auctionEndTime, " +
            "a.auctionStartTime, " +
            "a.daysToEndTime" +
            ") " +
            "FROM Auction AS a WHERE a.deleted = false ")
    List<AuctionDTO> getAllAuctions();

    @Query("SELECT NEW com.aso.model.dto.AuctionDTO (" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.email, " +
            "a.account, " +
            "a.product, " +
            "a.auctionType, " +
            "a.itemStatus, " +
            "a.startingPrice, " +
            "a.currentPrice, " +
            "a.auctionEndTime, " +
            "a.auctionStartTime, " +
            "a.daysToEndTime" +
            ") " +
            "FROM Auction AS a WHERE a.deleted = false AND a.id =?1 ")
    List<AuctionDTO> findAuctionById(Long idAuction);

    @Query("SELECT NEW com.aso.model.dto.AuctionDTO (" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.email, " +
            "a.account, " +
            "a.product, " +
            "a.auctionType, " +
            "a.itemStatus, " +
            "a.startingPrice, " +
            "a.currentPrice, " +
            "a.auctionEndTime, " +
            "a.auctionStartTime, " +
            "a.daysToEndTime" +
            ") " +
            "FROM Auction AS a WHERE a.deleted = false ")
    Page<AuctionDTO> findAllAuctions(Pageable pageable);

    @Query("SELECT NEW com.aso.model.dto.AuctionDTO (" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.email, " +
            "a.account, " +
            "a.product, " +
            "a.auctionType, " +
            "a.itemStatus, " +
            "a.startingPrice, " +
            "a.currentPrice, " +
            "a.auctionEndTime, " +
            "a.auctionStartTime, " +
            "a.daysToEndTime" +
            ") " +
            "FROM Auction AS a WHERE a.email LIKE :keyword AND a.deleted = false  ")
    Page<AuctionDTO> findAllAuctionss(Pageable pageable, @Param("keyword") String keyword);

    @Query("SELECT NEW com.aso.model.dto.AuctionDTO (" +
            "a.id, " +
            "a.createdAt, " +
            "a.createdBy, " +
            "a.updatedAt, " +
            "a.updatedBy, " +
            "a.email, " +
            "a.account, " +
            "a.product, " +
            "a.auctionType, " +
            "a.itemStatus, " +
            "a.startingPrice, " +
            "a.currentPrice, " +
            "a.auctionEndTime, " +
            "a.auctionStartTime, " +
            "a.daysToEndTime" +
            ") " +
            "FROM Auction AS a WHERE a.product.id = ?1")
    Optional<AuctionDTO> findByAuctionByProductId(Long id);
}

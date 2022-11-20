package com.aso.service.auction;

import com.aso.model.Auction;
import com.aso.model.dto.AuctionDTO;
import com.aso.service.IGeneralService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AuctionService extends IGeneralService<Auction> {

    Auction createAuction(AuctionDTO auctionDTO);

    List<AuctionDTO> getAllAuctions();

    void softDelete(Auction auction);

    Page<AuctionDTO> findAllAuctions(Pageable pageable);

    Page<AuctionDTO> findAllAuctionss(Pageable pageable, @Param("keyword") String keyword);

    Optional<AuctionDTO> findByAuctionByProductId(Long id);
}


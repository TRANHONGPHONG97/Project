package com.aso.service.bid;


import com.aso.model.Bid;
import com.aso.model.dto.BidDTO;
import com.aso.service.IGeneralService;

import java.util.List;

public interface BidService extends IGeneralService<Bid> {

    Bid createBid(BidDTO bidDTO);

    List<BidDTO> getAllBids();

    void softDelete(Bid bid);

    Bid deleteBid(Long auctionId, Long bidId);

    List<BidDTO> findByRelatedOfferId(Long id);
}

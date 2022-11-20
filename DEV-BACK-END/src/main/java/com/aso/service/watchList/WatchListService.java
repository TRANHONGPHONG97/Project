package com.aso.service.watchList;

import com.aso.model.Account;
import com.aso.model.Product;
import com.aso.model.WatchList;
import com.aso.model.dto.WatchListDTO;
import com.aso.service.IGeneralService;

import java.util.List;

public interface WatchListService extends IGeneralService<WatchList> {
    WatchListDTO doAddWatchList(Account account, Product product);
    void doRemoveWatchList(Account account, Product product);
    List<WatchListDTO> getWatchListDTOsByAccountId(Long accountId);

    WatchListDTO getWatchListDTOsByAccountIdAndProductId(Long accountId, Long productId);
}

package com.aso.repository;

import com.aso.model.WatchList;
import com.aso.model.dto.WatchListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchListRepository extends JpaRepository<WatchList, Long> {

    @Query("SELECT NEW com.aso.model.dto.WatchListDTO (" +
            "w.id, " +
            "w.account, " +
            "w.product, " +
            "w.createdAt) " +
            "FROM WatchList w  WHERE w.account.id = ?1 ")
    List<WatchListDTO> getWatchListDTOsByAccountId(Long accountId);

    @Query("SELECT NEW com.aso.model.dto.WatchListDTO (" +
            "w.id, " +
            "w.account, " +
            "w.product, " +
            "w.createdAt) " +
            "FROM WatchList w  WHERE w.account.id = ?1 AND w.product.id = ?2 ")
    WatchListDTO getWatchListDTOByAccountIdAndProductId(Long accountId, Long productId);
}

package com.aso.service.watchList;

import com.aso.exception.DataOutputException;
import com.aso.model.Account;
import com.aso.model.Product;
import com.aso.model.WatchList;
import com.aso.model.dto.WatchListDTO;
import com.aso.repository.AccountRepository;
import com.aso.repository.ProductRepository;
import com.aso.repository.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class WatchListServiceImpl implements WatchListService{
    @Autowired
    private WatchListRepository watchListRepository;

    @Override
    public Iterable<WatchList> findAll() {
        return null;
    }

    @Override
    public Optional<WatchList> findById(Long id) {
        return watchListRepository.findById ( id );
    }

    @Override
    public void removeById(WatchList watchList) {

    }

    @Override
    public WatchList save(WatchList watchList) {
        return watchListRepository.save ( watchList );
    }

    @Override
    public WatchList getById(Long id) {
        return watchListRepository.getById ( id );
    }

    @Override
    public void softDelete(WatchList watchList) {

    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public WatchListDTO doAddWatchList(Account account, Product product) {
        WatchList watchList = new WatchList ();
        watchList.setAccount ( account );
        watchList.setProduct ( product );

        WatchListDTO watchListDTO = watchListRepository.getWatchListDTOByAccountIdAndProductId ( account.getId (), product.getId () );
        if ( watchListDTO != null ) {
            throw new DataOutputException ( "Sản phẩm đã tồn tại trong danh sách yêu thích" );
        }

        WatchList newWatchList = watchListRepository.save ( watchList );
        return newWatchList.toWatchListDTO ();
    }

    @Override
    public void doRemoveWatchList(Account account, Product product) {
        WatchListDTO watchListDTO = watchListRepository.getWatchListDTOByAccountIdAndProductId ( account.getId (), product.getId () );
        if ( watchListDTO == null ) {
            throw new DataOutputException ( "Sản phẩm không tồn tại trong danh sách yêu thích" );
        }

        watchListRepository.delete ( watchListDTO.toWatchList () );
    }

    @Override
    public List<WatchListDTO> getWatchListDTOsByAccountId(Long accountId) {
        return watchListRepository.getWatchListDTOsByAccountId ( accountId );
    }

    @Override
    public WatchListDTO getWatchListDTOsByAccountIdAndProductId(Long accountId, Long productId) {
        return watchListRepository.getWatchListDTOByAccountIdAndProductId ( accountId, productId );
    }
}

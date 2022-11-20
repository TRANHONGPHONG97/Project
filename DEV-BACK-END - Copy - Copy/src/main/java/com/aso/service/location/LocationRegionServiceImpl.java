package com.aso.service.location;

import com.aso.model.LocationRegion;
import com.aso.model.Product;
import com.aso.repository.LocationRegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class LocationRegionServiceImpl implements LocationRegionService {
    @Autowired
    private LocationRegionRepository locationRegionRepository;

    @Override
    public Iterable<LocationRegion> findAll() {
        return null;
    }


    @Override
    public Optional<LocationRegion> findById(Long id) {
        return Optional.empty ();
    }

    @Override
    public void removeById(LocationRegion locationRegion) {

    }

    @Override
    public LocationRegion save(LocationRegion locationRegion) {
        return locationRegionRepository.save ( locationRegion );
    }

    @Override
    public LocationRegion getById(Long id) {
        return null;
    }

    @Override
    public void softDelete(LocationRegion locationRegion) {

    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }
}

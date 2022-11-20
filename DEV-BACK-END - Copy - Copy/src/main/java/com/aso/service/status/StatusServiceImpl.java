package com.aso.service.status;

import com.aso.model.Product;
import com.aso.model.Status;
import com.aso.model.dto.StatusDTO;
import com.aso.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class StatusServiceImpl implements StatusService{
    @Autowired
    private StatusRepository statusRepository;

    @Override
    public Iterable<Status> findAll() {
        return null;
    }

    @Override
    public Optional<Status> findById(Long id) {
        return statusRepository.findById ( id );
    }

    @Override
    public void removeById(Status status) {

    }

    @Override
    public Status save(Status status) {
        return statusRepository.save ( status );
    }

    @Override
    public Status getById(Long id) {
        return null;
    }

    @Override
    public void softDelete(Status status) {

    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public StatusDTO findOrderDTOById(Long id) {
        return statusRepository.findStatusDTOById ( id );
    }
}

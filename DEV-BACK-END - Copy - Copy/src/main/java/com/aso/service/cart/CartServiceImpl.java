package com.aso.service.cart;


import com.aso.model.Cart;
import com.aso.model.Product;
import com.aso.model.dto.CartDTO;
import com.aso.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<Cart> findAll() {
        return null;
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return cartRepository.findById ( id );
    }

    @Override
    public Cart getById(Long id) {
        return cartRepository.getById ( id );
    }

    @Override
    public void softDelete(Cart cart) {

    }

    @Override
    public Optional<Cart> findByCreatedBy(String createdBy) {
        return cartRepository.findByCreatedBy(createdBy);
    }

    @Override
    public Boolean existsByCreatedBy(String createdBy) {
        return cartRepository.existsByCreatedBy(createdBy);
    }

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public void delete(Cart cart) {
        cartRepository.delete(cart);
    }

    @Override
    public void removeById(Cart cart) {

    }

    @Override
    public Optional<CartDTO> findCartDTOByIdAccountInfo(Long id) {
        return cartRepository.findCartDTOByIdAccountInfo(id);
    }
}

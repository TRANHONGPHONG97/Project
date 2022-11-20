package com.aso.service.order;


import com.aso.exception.AccountInputException;
import com.aso.model.*;
import com.aso.model.dto.*;
import com.aso.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private StatusRepository statusRepository;
    @Autowired
    private LocationRegionRepository locationRegionRepository;

    @Override
    public List<Order> findAll() {
        return null;
    }

    @Override
    public Optional<Order> findById(Long id) {
        return orderRepository.findById ( id );
    }

    @Override
    public Order getById(Long id) {
        return null;
    }

    @Override
    public void softDelete(Order order) {

    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public OrderDTO findOrderDTOById(Long orderId) {
        return orderRepository.findOrderDTOById(orderId);
    }

    @Override
    public List<OrderDTO> findOrderDTOByUsername(String username) {
        return orderRepository.findOrderDTOByUsername ( username );
    }

    @Override
    public List<OrderDTO> findOrderDTO() {
        return orderRepository.findOrderDTO();
    }
    @Override
    public List<OrderDTO> findOrderDTOByDeliver(String order) {
        return orderRepository.findOrderDTOByDeliver(order);
    }
    @Override
    public List<OrderDTO> findAllOrderDTOByOrderDetailId(Long id) {
        return orderRepository.findAllOrderDTOByOrderDetailId(id);
    }

    @Override
    public void removeById(Order order) {
        orderRepository.save ( order );
    }

    @Override
    public OrderDTO doCheckoutOrder(Long accountId, OrderDTO orderDTO) {
        Optional<Account> accountOptional = accountRepository.findById ( accountId );
        if ( !accountOptional.isPresent () ) {
            throw new AccountInputException ( "Tài khoản không tồn tại" );
        }
        StatusDTO status = statusRepository.findStatusDTOById ( 7L );

        LocationRegion newLocationRegion = locationRegionRepository.save ( orderDTO.getLocationRegion ().toLocationRegion () );
        orderDTO.setLocationRegion ( newLocationRegion.toLocationRegionDTO () );

        orderDTO.setAccount ( accountOptional.get ().toAccountDTO () );
        orderDTO.setStatus ( status );
        orderDTO.setCreatedBy ( accountOptional.get ().getEmail () );
        Order order = orderRepository.save ( orderDTO.toOrder () );

        return order.toOrderDTO ();
    }

    @Override
    public void doRemoveOrder(Long orderId) {
        Optional<Order> orderOptional = orderRepository.findById ( orderId );
        StatusDTO status = statusRepository.findStatusDTOById ( 6L );
        Order order = orderOptional.get ();
        order.setDeleted ( true );
        order.setStatus ( status.toStatus () );

        orderRepository.save ( order );
    }
}

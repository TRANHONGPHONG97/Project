package com.aso.service.order;


import com.aso.model.Order;
import com.aso.model.dto.OrderDTO;
import com.aso.service.IGeneralService;

import java.util.List;

public interface OrderService extends IGeneralService<Order> {
    OrderDTO findOrderDTOById(Long orderId);
    List<OrderDTO> findOrderDTOByUsername(String username);
    List<OrderDTO> findOrderDTO();
    List<OrderDTO> findOrderDTOByDeliver(String order);
    List<OrderDTO> findAllOrderDTOByOrderDetailId (Long id);

    OrderDTO doCheckoutOrder (Long accountId, OrderDTO orderDTO);

    void doRemoveOrder(Long id);
}

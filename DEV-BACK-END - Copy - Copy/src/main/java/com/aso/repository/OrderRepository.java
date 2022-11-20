package com.aso.repository;


import com.aso.model.Order;
import com.aso.model.dto.OrderDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT NEW com.aso.model.dto.OrderDTO(" +
            "o.id, " +
            "o.fullName, " +
            "o.phone, " +
            "o.email, " +
            "o.locationRegion, " +
            "o.description, " +
            "o.account, " +
            "o.status, " +
            "o.createdBy " +
            ") " +
            "FROM Order AS o  WHERE o.id = ?1 ")
    OrderDTO findOrderDTOById(Long orderId);
    @Query("SELECT NEW com.aso.model.dto.OrderDTO(" +
            "o.id, " +
            "o.fullName, " +
            "o.phone, " +
            "o.email, " +
            "o.locationRegion, " +
            "o.description, " +
            "o.account, " +
            "o.status, " +
            "o.createdBy " +
            ") " +
            "FROM Order AS o " +
            "WHERE o.account.username = ?1")
    List<OrderDTO> findOrderDTOByUsername(String username);

    @Query("SELECT NEW com.aso.model.dto.OrderDTO(" +
            "o.id, " +
            "o.fullName, " +
            "o.phone, " +
            "o.email, " +
            "o.locationRegion, " +
            "o.description, " +
            "o.account, " +
            "o.status, " +
            "o.createdBy " +
            ") " +
            "FROM Order AS o ")
    List<OrderDTO> findOrderDTO();

    @Query("SELECT NEW com.aso.model.dto.OrderDTO(" +
            "o.id, " +
            "o.fullName, " +
            "o.phone, " +
            "o.email, " +
            "o.locationRegion, " +
            "o.description, " +
            "o.account, " +
            "o.status, " +
            "o.createdBy " +
            ") " +
            "FROM Order o where o.status = ?1")
    List<OrderDTO> findOrderDTOByDeliver(String order);

    @Query("SELECT NEW com.aso.model.dto.OrderDTO(" +
            "o.id, " +
            "o.fullName, " +
            "o.phone, " +
            "o.email, " +
            "o.locationRegion, " +
            "o.description, " +
            "o.account, " +
            "o.status, " +
            "o.createdBy " +
            ") " +
            "FROM Order o")
    List<OrderDTO> findAllOrderDTOByOrderDetailId(Long id);
}

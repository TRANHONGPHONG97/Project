package com.aso.service.orderdetail;

import com.aso.model.Chart;
import com.aso.model.OrderDetail;
import com.aso.model.Status;
import com.aso.model.dto.OrderDetailDTO;
import com.aso.service.IGeneralService;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailService extends IGeneralService<OrderDetail> {

    List<OrderDetailDTO> findAllOrderDetailByAccountEmail(String email);

    List<OrderDetailDTO> findAllOrderDetailByProductCreatedBy(String createdBy);
    List<OrderDetailDTO> findAllOrderDetailById(String id);
    OrderDetail deliveryOrder(OrderDetail orderDetail, String title);
    OrderDetail checkOutOrder(OrderDetail orderDetail, String title);

    List<OrderDetailDTO> findOderByCreateMonthYearAndStatusOrderDetail(@Param("createMonth") int createMonth, @Param("createYear") int createYear, @Param("statusOrderDetail") String statusOrderDetail );
    List<OrderDetailDTO> findOderByCreateYearAndStatusOrderDetail( @Param("createYear") int createYear, @Param("statusOrderDetail") String statusOrderDetail );

    List<OrderDetailDTO> doCreateOrderDetail (Long orderId, List<OrderDetailDTO> orderDetailDTOList);

    OrderDetailDTO doUpdateStatus (OrderDetail orderDetail, Status status);
    List<Chart> getListChart(String year);
    List<Chart> getTurnoverByMonth();
}

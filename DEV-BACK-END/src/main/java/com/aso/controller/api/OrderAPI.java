package com.aso.controller.api;


import com.aso.model.Order;
import com.aso.model.OrderDetail;
import com.aso.model.dto.OrderDTO;
import com.aso.model.dto.OrderDetailDTO;
import com.aso.service.order.OrderService;
import com.aso.service.orderdetail.OrderDetailService;
import com.aso.service.status.StatusService;
import com.aso.utils.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderAPI {
    @Autowired
    private AppUtil appUtils;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderDetailService orderDetailService;

    @GetMapping()
    public ResponseEntity<?> findAllOrder(){
        List<OrderDTO> orderDTOS = orderService.findOrderDTO();
        if (orderDTOS.isEmpty()){
            throw new RuntimeException("Không tìm thấy order");
        }
        return new ResponseEntity<>(orderDTOS,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> findOrderByUserName(@PathVariable Long id) {
        OrderDTO orderList = orderService.findOrderDTOById(id);

        return new ResponseEntity<>(orderList,HttpStatus.OK);
    }


    @GetMapping("/order-detail/{id}")
    public ResponseEntity<?> findAllOrderDetailById(@PathVariable Long id){
        Optional<OrderDetail> orderDetailDTOS = orderDetailService.findById(id);
        if ( !orderDetailDTOS.isPresent () ){
            throw new RuntimeException("Không tìm thấy order");
        }
        return new ResponseEntity<>(orderDetailDTOS.get().toOrderDetailDTO(),HttpStatus.OK);
    }

    @GetMapping("/order-detail/findAll/")
    public ResponseEntity<?> findAllOrderDetail(){
        List<OrderDetail> orderDetailDTOS = (List<OrderDetail>) orderDetailService.findAll();
        if (orderDetailDTOS.isEmpty()){
            throw new RuntimeException("Không tìm thấy order");
        }
        return new ResponseEntity<>(orderDetailDTOS,HttpStatus.OK);
    }

    @GetMapping("/order-detail/status/")
    public ResponseEntity<?> findAllOrderById(){
        GregorianCalendar gregorianCalendar = new GregorianCalendar();
        List<OrderDetailDTO> orderDetailDTOS = orderDetailService.findOderByCreateMonthYearAndStatusOrderDetail(gregorianCalendar.get(Calendar.MONTH) + 1,gregorianCalendar.get(Calendar.YEAR),"Đang chờ duyệt");
        if (orderDetailDTOS.isEmpty()){
            throw new RuntimeException("Không tìm thấy order");
        }
        return new ResponseEntity<>(orderDetailDTOS,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderDTO orderDTO, BindingResult bindingResult) throws MessagingException, UnsupportedEncodingException {

        if (bindingResult.hasErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }
        try {
            orderService.save(orderDTO.toOrder());
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/order-deliver/")
    public ResponseEntity<?> findAllOrderDeliver(){
        List<OrderDTO> orderDTOS = orderService.findOrderDTOByDeliver("Đã giao hàng thành công");
        if (orderDTOS.isEmpty()){
            throw new RuntimeException("Không tìm thấy order");
        }
        return new ResponseEntity<>(orderDTOS,HttpStatus.OK);
    }

    @GetMapping("/order/getOrder/{id}")
    public ResponseEntity<?> findAllOrderByOrderDetailId(@PathVariable Long id){
        List<OrderDTO> orderDTOS = orderService.findAllOrderDTOByOrderDetailId(id);
        if (orderDTOS.isEmpty()){
            throw new RuntimeException("Không tìm thấy order");
        }
        return new ResponseEntity<>(orderDTOS,HttpStatus.OK);
    }

    @PutMapping("/order-detail/checkout/{title}")
    public ResponseEntity<?> checkOutOrder(@RequestBody OrderDetailDTO orderDetailDTO,@PathVariable String title, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }
        try {
            OrderDetail orderDetail =  orderDetailService.checkOutOrder(orderDetailDTO.toOrderDetail(),title);
            return new ResponseEntity<>(orderDetail.toOrderDetailDTO(), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    @PutMapping("/order-detail/delivery/{title}")
    public ResponseEntity<?> doDeliveryOrder(@RequestBody OrderDetailDTO orderDetailDTO,@PathVariable String title, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }
        try {
            return new ResponseEntity<>(orderDetailService.deliveryOrder(orderDetailDTO.toOrderDetail(),title), HttpStatus.ACCEPTED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/checkout/{accountId}")
    public ResponseEntity<?> doCreateOrderClient(@PathVariable Long accountId,
                                                      @Validated @RequestBody OrderDTO orderDTO,
                                                      BindingResult bindingResult
    ) throws MessagingException, UnsupportedEncodingException {

        if (bindingResult.hasErrors()) {
            return appUtils.mapErrorToResponse(bindingResult);
        }
        try {
            OrderDTO newOrderDTO = orderService.doCheckoutOrder ( accountId, orderDTO );
            return new ResponseEntity<>(newOrderDTO, HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage (),HttpStatus.NO_CONTENT);
        }
    }
    @PutMapping("/remove-order/{orderId}")
    public ResponseEntity<?> doRemoveOrder(@PathVariable Long orderId) {
        try {
            Optional<Order> orderOptional = orderService.findById ( orderId );
            if ( !orderOptional.isPresent () ) {
                throw new RuntimeException ("Đơn hàng không tồn tại");
            }
            orderService.doRemoveOrder ( orderId );
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Lỗi không xác định",HttpStatus.NO_CONTENT);
        }
    }
}

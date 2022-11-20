package com.aso.controller.api;


import com.aso.model.dto.RoleDTO;
import com.aso.service.role.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleAPI {

    @Autowired
    private RoleService roleService;

    @GetMapping()
    public ResponseEntity<?> findAllRoles() {
        try {
            List<RoleDTO> roleDTOS = roleService.findAllRoles();
            return new ResponseEntity<>(roleDTOS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<> ( HttpStatus.BAD_REQUEST );
        }
    }
}

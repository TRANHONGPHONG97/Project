package com.aso.service.role;

import com.aso.model.Role;
import com.aso.model.dto.RoleDTO;
import com.aso.service.IGeneralService;

import java.util.List;

public interface RoleService extends IGeneralService<Role> {
    Role findByName(String name);

    List<RoleDTO> findAllRoles();
}

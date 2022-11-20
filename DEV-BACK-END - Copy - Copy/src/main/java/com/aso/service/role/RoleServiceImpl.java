package com.aso.service.role;

import com.aso.model.Product;
import com.aso.model.Role;
import com.aso.model.dto.RoleDTO;
import com.aso.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return roleRepository.findById(id);
    }

    @Override
    public void removeById(Role role) {

    }


    @Override
    public Role save(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role getById(Long id) {
        return null;
    }

    @Override
    public void softDelete(Role role) {

    }

    @Override
    public void delete(Product id) {
        roleRepository.deleteById (id);
    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public Role findByName(String name) {
        return roleRepository.findByName(name);
    }

    @Override
    public List<RoleDTO> findAllRoles() {
        return roleRepository.findAllRoles();
    }
}

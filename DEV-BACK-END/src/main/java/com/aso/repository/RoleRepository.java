package com.aso.repository;


import com.aso.model.Product;
import com.aso.model.Role;
import com.aso.model.dto.RoleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(String name);

    void deleteById(Product id);
    @Query("SELECT NEW com.aso.model.dto.RoleDTO(" +
            "r.id, " +
            "r.code, " +
            "r.name " +
            ") FROM Role AS r")
    List<RoleDTO> findAllRoles();

}

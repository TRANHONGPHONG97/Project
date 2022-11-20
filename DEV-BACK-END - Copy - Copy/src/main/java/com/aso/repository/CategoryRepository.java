package com.aso.repository;

import com.aso.model.Category;
import com.aso.model.dto.CategoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT NEW com.aso.model.dto.CategoryDTO (" +
            "c.id, " +
            "c.title, " +
            "c.slug)  " +
            "FROM Category c  WHERE c.deleted = false ")
    List<CategoryDTO> findAllCategoryDTO();

    @Query("SELECT NEW com.aso.model.dto.CategoryDTO (" +
            "c.id, " +
            "c.title, " +
            "c.slug)  " +
            "FROM Category c  WHERE c.id = ?1 ")
    Optional<CategoryDTO> findCategoryDTOById(Long id);
    Boolean existsCategoryByTitle(String title);

    @Query("SELECT NEW com.aso.model.dto.CategoryDTO (" +
            "c.id, " +
            "c.title, " +
            "c.slug)  " +
            "FROM Category c  WHERE c.deleted = false ")
    Page<CategoryDTO> findAllCategoryDTOPage(Pageable pageable);

    @Query("SELECT NEW com.aso.model.dto.CategoryDTO (" +
            "c.id, " +
            "c.title, " +
            "c.slug)  " +
            "FROM Category c  WHERE c.title LIKE :keyword AND c.deleted = false ")
    Page<CategoryDTO> getAllCategroys(Pageable pageable, @Param("keyword") String keyword);
}

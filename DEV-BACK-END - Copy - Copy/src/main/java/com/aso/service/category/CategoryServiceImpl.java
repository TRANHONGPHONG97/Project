package com.aso.service.category;


import com.aso.model.Category;
import com.aso.model.Product;
import com.aso.model.dto.CategoryDTO;
import com.aso.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return null;
    }

    @Override
    public Optional<Category> findById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public void removeById(Category category) {

    }

    @Override
    public Category getById(Long id) {
        return null;
    }

    @Override
    public void softDelete(Category category) {
        category.setDeleted(true);
        categoryRepository.save(category);
    }

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Product id) {

    }

    @Override
    public List<CategoryDTO> findAllCategoryDTO() {
        return categoryRepository.findAllCategoryDTO();
    }

    @Override
    public Optional<CategoryDTO> findCategoryDTOById(Long id) {
        return categoryRepository.findCategoryDTOById(id);
    }

    @Override
    public void deleteCategory(Long id) {

        categoryRepository.deleteById(id);
    }

    @Override
    public Boolean existsCategoryByTitle(String title) {
        return categoryRepository.existsCategoryByTitle(title);
    }

    @Override
    public Boolean existById(Long id) {
        return null;
    }

    @Override
    public Page<CategoryDTO> findAllCategoryDTOPage(Pageable pageable) {
        return categoryRepository.findAllCategoryDTOPage(pageable);
    }
    @Override
    public Page<CategoryDTO> getAllCategroys(Pageable pageable, @Param("keyword") String keyword) {
        return categoryRepository.getAllCategroys(pageable, keyword);
    }
}

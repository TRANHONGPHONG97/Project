package com.aso.service;
import com.aso.model.Product;
import java.util.Optional;

public interface IGeneralService<T> {
    Iterable<T> findAll();
    Optional<T> findById(Long id);

    void removeById(T t);
    T save(T t);
    T getById(Long id);
    void softDelete(T t);
    void delete(Product id);
    Boolean existById(Long id);

}

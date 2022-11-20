package com.aso.model;


import com.aso.model.dto.CategoryDTO;
import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "categories")
@Accessors(chain = true)
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String slug;

    @OneToMany(mappedBy = "category")
    private List<Product> products;

    public CategoryDTO toCategoryDTO() {
        return new CategoryDTO ()
                .setId ( id )
                .setTitle ( title )
                .setSlug ( slug );
    }
}

package com.examedge.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examedge.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

	@Query(value = "select * from category where parent_id is null ",nativeQuery = true)
	List<Category> getAllCategories();
	
	@Query(value="select * from category where parent_id:=category",nativeQuery =true )
	List<Category>getSubCategory(Long id);
	
	@Query(value = "select * from category ",nativeQuery = true)
	List<Category>getAllChildCatgory();
	
	
}

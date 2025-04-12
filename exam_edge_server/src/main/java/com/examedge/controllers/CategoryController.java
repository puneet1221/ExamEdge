package com.examedge.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examedge.entity.Category;
import com.examedge.repo.CategoryRepository;

@RestController
@RequestMapping("/category")
public class CategoryController {

	@Autowired
	CategoryRepository repository;

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/")
	public ResponseEntity<?> addCategory(@RequestBody Category category) {
		for (Category subcateogry : category.getSubcategory()) {
			subcateogry.setParent(category);
		}
		repository.save(category);
		return new ResponseEntity<>("ok", HttpStatus.CREATED);
	}

	@PostMapping("/addSubcategory/{parentId}")
	public ResponseEntity<?> addSubcategory(@RequestBody Category category, @PathVariable Integer parentId) {
		System.err.print("testing");
		category.setParent(repository.findById(parentId).get());
		repository.save(category);
		return new ResponseEntity<>("created", HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public Category getCategory(@PathVariable Integer id) {
		Optional<Category> opt = repository.findById(id);
		if (opt.isEmpty())
			return null;
		return opt.get();
	}

	@GetMapping("/getAll")
	public ResponseEntity<?> getAll() {
		return new ResponseEntity<List<Category>>(repository.getAllCategories(), HttpStatus.OK);

	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@DeleteMapping("/{categoryId}")
	public ResponseEntity<?> deleteCategory(@PathVariable Integer categoryId) {
		System.err.print("testing");
		repository.delete(repository.findById(categoryId).get());
		return new ResponseEntity<>("deleted", HttpStatus.OK);
	}

	@DeleteMapping("/all")
	public ResponseEntity<String> deleteAll() {
		repository.deleteAll();
		return new ResponseEntity<>("cleared all category", HttpStatus.ACCEPTED);
	}

	@GetMapping("/{parent_id}")
	public ResponseEntity<?> getSubCategory(@PathVariable long parent_id) {
		return new ResponseEntity<>(repository.getSubCategory(parent_id), HttpStatus.OK);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable int id) {
		repository.deleteById(id);
		return new ResponseEntity<>("deleted", HttpStatus.OK);
	}

	@GetMapping("/getChildren")
	public ResponseEntity<?> getAllSub() {
		return new ResponseEntity<>(repository.getAllChildCatgory(), HttpStatus.OK);
	}

}

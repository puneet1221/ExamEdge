package com.examedge.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String description;

    @JsonManagedReference
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL)  // This will handle deleting subcategories
    private List<Quiz> quizList;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)  // This ensures child categories are deleted when removed
    @JsonManagedReference
    private List<Category> subcategory = new ArrayList<>();

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.ALL)  // No CascadeType.ALL here, only persist to ensure parent is saved
    @JoinColumn(name = "parent_id", foreignKey = @ForeignKey(name = "category_subcategory"))
    private Category parent;

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Quiz> getQuizList() {
        return quizList;
    }

    public void setQuizList(List<Quiz> quizList) {
        this.quizList = quizList;
    }

    public List<Category> getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(List<Category> subcategory) {
        this.subcategory = subcategory;
    }

    public Category getParent() {
        return parent;
    }

    public void setParent(Category parent) {
        this.parent = parent;
    }

    public void addSubcategory(Category subcategory) {
        subcategory.setParent(this);  // Set the parent when adding a subcategory
        this.subcategory.add(subcategory);
    }
}

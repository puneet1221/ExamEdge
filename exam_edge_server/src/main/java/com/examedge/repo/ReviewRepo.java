package com.examedge.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.examedge.entity.UserReview;

@Repository
public interface  ReviewRepo extends JpaRepository<UserReview, Long> {

}

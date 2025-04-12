package com.examedge.repo;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examedge.entity.Notifications;

@Repository
public interface NotificationsRepo extends JpaRepository<Notifications, Integer> {
	@Query(value = "SELECT * FROM notifications ORDER BY id DESC", nativeQuery = true)
	Page<Notifications> findAllNotifications(Pageable pageable);


}

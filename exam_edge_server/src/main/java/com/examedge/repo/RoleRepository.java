package com.examedge.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examedge.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	@Query(value = "select * from roles where role_name=:name",nativeQuery = true)
	public Optional<Role> findByRole_name(@Param( "name") String name);




	

}

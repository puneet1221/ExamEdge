package com.examedge;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.transaction.Transactional;

@SpringBootApplication
public class ExamEdgeServerApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ExamEdgeServerApplication.class, args);
	}

	@Override
	@Transactional
	public void run(String... args) throws Exception {

	}

}

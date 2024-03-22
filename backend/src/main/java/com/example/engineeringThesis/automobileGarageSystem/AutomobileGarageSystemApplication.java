package com.example.engineeringThesis.automobileGarageSystem;

import com.example.engineeringThesis.automobileGarageSystem.dao.CarDAO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AutomobileGarageSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutomobileGarageSystemApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(CarDAO carDAO) {
		return runner -> {
			createCar(carDAO);
		};
	}

	private void createCar(CarDAO carDAO) {
		Car tmpCar = new Car("JTLZE4FE7A1116475", "BMW", "Leon", true, "WX34567");
		carDAO.save(tmpCar);
		System.out.println("Car "+tmpCar.toString() + " saved into database");
	}

}

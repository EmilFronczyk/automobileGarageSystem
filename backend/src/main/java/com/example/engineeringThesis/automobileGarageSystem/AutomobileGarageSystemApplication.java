package com.example.engineeringThesis.automobileGarageSystem;

import com.example.engineeringThesis.automobileGarageSystem.dao.CarDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.ClientDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.WorkerDAO;
import com.example.engineeringThesis.automobileGarageSystem.entity.Car;
import com.example.engineeringThesis.automobileGarageSystem.entity.Client;
import com.example.engineeringThesis.automobileGarageSystem.entity.Worker;
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
	public CommandLineRunner commandLineRunner(CarDAO carDAO, ClientDAO clientDAO, WorkerDAO workerDAO) {
		return runner -> {
			createTables(carDAO, clientDAO, workerDAO);
		};
	}

	private void createTables(CarDAO carDAO, ClientDAO clientDAO, WorkerDAO workerDAO) {
		Car tmpCar = new Car("JTLZE4FE7A1116475", "BMW", "Leon", true, "WX34567");
		Worker tmpWorker = new Worker("Jan", "Nowak", "Mechanik", 25, "12/03/2020", "123456789");
		Client tmpClient = new Client("Grzegorz", "Brzęczyszczykiewicz", "789456123");
		carDAO.save(tmpCar);
		clientDAO.save(tmpClient);
		workerDAO.save(tmpWorker);
		System.out.println("Car "+tmpCar.toString() + " saved into database");
		System.out.println("Worker "+tmpWorker.toString() + " saved into database");
		System.out.println("Client "+tmpClient.toString() + " saved into database");
	}

}

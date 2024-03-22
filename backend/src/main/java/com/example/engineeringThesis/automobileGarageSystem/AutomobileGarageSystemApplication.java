package com.example.engineeringThesis.automobileGarageSystem;

import com.example.engineeringThesis.automobileGarageSystem.dao.car.CarDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.client.ClientDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.parts.PartsDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.repair.RepairDAO;
import com.example.engineeringThesis.automobileGarageSystem.dao.worker.WorkerDAO;
import com.example.engineeringThesis.automobileGarageSystem.entity.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class AutomobileGarageSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutomobileGarageSystemApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(CarDAO carDAO, ClientDAO clientDAO, WorkerDAO workerDAO, RepairDAO repairDAO, PartsDAO partsDAO) {
		return runner -> {
			//createTables(carDAO, clientDAO, workerDAO, repairDAO, partsDAO);
			readTables(carDAO, clientDAO, workerDAO, repairDAO, partsDAO);
		};
	}

	private void readTables(CarDAO carDAO, ClientDAO clientDAO, WorkerDAO workerDAO, RepairDAO repairDAO, PartsDAO partsDAO) {
		List<Car> cars = carDAO.findAll();
		List<Client> clients = clientDAO.findAll();
		List<Worker> workers = workerDAO.findAll();
		List<Repair> repairs = repairDAO.findAll();
		List<Parts> parts = partsDAO.findAll();

		System.out.print("\n");
		for (Car car : cars) {
			System.out.println(car);
		}
		System.out.print("\n");

		for (Client client : clients) {
			System.out.println(client);
		}
		System.out.print("\n");

		for (Worker worker : workers) {
			System.out.println(worker);
		}
		System.out.print("\n");

		for (Repair repair : repairs) {
			System.out.println(repair);
		}
		System.out.print("\n");

		for (Parts part : parts) {
			System.out.println(part);
		}
		System.out.print("\n");
	}

	private void createTables(CarDAO carDAO, ClientDAO clientDAO, WorkerDAO workerDAO, RepairDAO repairDAO, PartsDAO partsDAO) {
		Car tmpCar1 = new Car("JTLZE4FE7A1116475", "Seat", "Leon", true, "WX34567");
		Car tmpCar2 = new Car("WBA3A5G59ENP31624", "BMW", "E46", true, "WPR78945");
		Car tmpCar3 = new Car("1FMRU15W71LB90650", "Volvo", "XC60", true, "WI12345");
		Car tmpCar4 = new Car("1G2NE52TXYM815391", "Renault", "Clio", true, "WX78936");

		Worker tmpWorker1 = new Worker("Jan", "Nowak", "Mechanik", 25, "12/03/2020", "123456789");
		Worker tmpWorker2 = new Worker("Adam", "Kowalski", "Mechanik", 25, "16/03/2020", "789456123");
		Worker tmpWorker3 = new Worker("Marek", "Papuga", "Magazynier", 25, "12/12/2015", "456789123");
		Worker tmpWorker4 = new Worker("Tomek", "Montana", "Kierowca", 25, "15/09/2006", "123789456");

		Client tmpClient1 = new Client("Grzegorz", "Brzęczyszczykiewicz", "789456123");
		Client tmpClient2 = new Client("Malik", "Montana", "696321852");
		Client tmpClient3 = new Client("Michael", "Dzordan", "723901384");
		Client tmpClient4 = new Client("LeBron", "Jakub", "515212313");

		Parts tmpPart1 = new Parts("124ABCU12", 78, 89, "Pół ośka lewa");
		Parts tmpPart2 = new Parts("789XYZA15", 40, 89, "Tarcza hamulcowa Brembo - przód");
		Parts tmpPart3 = new Parts("456TYUN18", 5, 89, "Wałek rozrządu VAG");
		Parts tmpPart4 = new Parts("345WSAD17", 7, 89, "Klocki hamulcowe Brembo - przód");

		Repair tmpRepair1 = new Repair("Wymiana oleju", "21/03/2024");
		Repair tmpRepair2 = new Repair("Wymiana kół", "29/02/2024");
		Repair tmpRepair3 = new Repair("Serwis klimatyzacji", "21/06/2021");
		Repair tmpRepair4 = new Repair("Wymiana rozrządu", "15/04/2020");

        for (Car car : Arrays.asList(tmpCar1, tmpCar2, tmpCar3, tmpCar4)) {
            carDAO.save(car);
			System.out.println("Car "+car.toString() + " saved into database");
        }

        for (Client client : Arrays.asList(tmpClient1, tmpClient2, tmpClient3, tmpClient4)) {
            clientDAO.save(client);
			System.out.println("Client "+client.toString() + " saved into database");
        }

		for (Worker worker : Arrays.asList(tmpWorker1, tmpWorker2, tmpWorker3, tmpWorker4)) {
			workerDAO.save(worker);
			System.out.println("Worker "+worker.toString() + " saved into database");
		}

		for (Parts parts : Arrays.asList(tmpPart1, tmpPart2, tmpPart3, tmpPart4)) {
			partsDAO.save(parts);
			System.out.println("Part "+parts.toString() + " saved into database");
		}

		for (Repair repair : Arrays.asList(tmpRepair1, tmpRepair2, tmpRepair3, tmpRepair4)) {
			repairDAO.save(repair);
			System.out.println("Repair "+repair.toString() + " saved into database");
		}
	}

}

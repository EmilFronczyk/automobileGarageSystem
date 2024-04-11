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
			//readTables(carDAO, clientDAO, workerDAO, repairDAO, partsDAO);
			createClientWithCars(carDAO, clientDAO, workerDAO, repairDAO, partsDAO);
			createCarsAndWorkersWithRepairs(carDAO, clientDAO, workerDAO, repairDAO);
		};
	}

	private void createCarsAndWorkersWithRepairs(CarDAO carDAO, ClientDAO clientDAO, WorkerDAO workerDAO, RepairDAO repairDAO) {
		Car tmpCar1 = new Car("1G1PC5SB1E7125694", "Mazda", "MX5", true, "WSD23456");
		Worker tmpWorker1 = new Worker("Stanisław", "Świszczypała", "Mechanik", 30, "12/03/2018", "489126745");
		Repair tmpRepair1 = new Repair("Wymiana wałków rozrządu", "05/04/2024");
		Client tmpClient1 = new Client("Emil", "Fronczyk", "456741589");
		tmpCar1.addRepair(tmpRepair1);
		tmpWorker1.addRepair(tmpRepair1);
		tmpClient1.add(tmpCar1);
		clientDAO.save(tmpClient1); //dzięki typom kaskadowym wystaczy zapisać klienta w bazie a reszta też zostanie zapisana dzięki powiązaniom ze sobą
	}

	private void createClientWithCars(CarDAO carDAO, ClientDAO clientDAO, WorkerDAO workerDAO, RepairDAO repairDAO, PartsDAO partsDAO) {
		Car tmpCar1 = new Car("JTLZE4FE7A1116475", "Audi", "Q5", true, "WY45678");
		Worker tmpWorker1 = new Worker("Jan", "Nowak", "Mechanik", 25, "12/03/2020", "123456789");
		Repair tmpRepair1 = new Repair("Wymiana oleju", "21/03/2024");
		Client tmpClient1 = new Client("Beata", "Dziewulska", "456741589");

		Car tmpCar2 = new Car("WBA3A5G59ENP31624", "Range Rover", "Discovery", true, "WPl90876");

		Car tmpCar3 = new Car("JTLZE4FE7A1116475", "Seat", "Leon", true, "WX34567");
		Worker tmpWorker2 = new Worker("Adam", "Kowalski", "Mechanik", 25, "16/03/2020", "789456123");
		Repair tmpRepair2 = new Repair("Wymiana kół", "29/02/2024");
		Client tmpClient2 = new Client("Grzegorz", "Brzęczyszczykiewicz", "789456123");

		Car tmpCar4 = new Car("WBA3A5G59ENP31624", "BMW", "E46", true, "WPR78945");
		Worker tmpWorker3 = new Worker("Marek", "Papuga", "Magazynier", 25, "12/12/2015", "456789123");
		Repair tmpRepair3 = new Repair("Serwis klimatyzacji", "21/06/2021");
		Client tmpClient3 = new Client("Malik", "Montana", "696321852");

		Car tmpCar5 = new Car("1FMRU15W71LB90650", "Volvo", "XC60", true, "WI12345");
		Worker tmpWorker4 = new Worker("Tomek", "Montana", "Kierowca", 25, "15/09/2006", "123789456");
		Repair tmpRepair4 = new Repair("Wymiana rozrządu", "15/04/2020");
		Client tmpClient4 = new Client("Michael", "Dzordan", "723901384");

		Car tmpCar6 = new Car("1G2NE52TXYM815391", "Renault", "Clio", true, "WX78936");
		Worker tmpWorker5 = new Worker("Waldek", "Kiepski", "Mechanik", 25, "19/03/2020", "533432198");
		Repair tmpRepair5 = new Repair("Nabicie klimatyzacji", "10/04/2013");
		Client tmpClient5 = new Client("LeBron", "Jakub", "515212313");






		Parts tmpPart1 = new Parts("124ABCU12", 78, 89, "Pół ośka lewa");
		Parts tmpPart2 = new Parts("789XYZA15", 40, 89, "Tarcza hamulcowa Brembo - przód");
		Parts tmpPart3 = new Parts("456TYUN18", 5, 89, "Wałek rozrządu VAG");
		Parts tmpPart4 = new Parts("345WSAD17", 7, 89, "Klocki hamulcowe Brembo - przód");
		for (Parts parts : Arrays.asList(tmpPart1, tmpPart2, tmpPart3, tmpPart4)) {
			partsDAO.save(parts);
			System.out.println("Part "+parts.toString() + " saved into database");
		}


		tmpCar1.addRepair(tmpRepair1);
		tmpWorker1.addRepair(tmpRepair1);
		tmpClient1.add(tmpCar1);
		tmpClient1.add(tmpCar2);
		clientDAO.save(tmpClient1);

		tmpCar3.addRepair(tmpRepair2);
		tmpWorker2.addRepair(tmpRepair2);
		tmpClient2.add(tmpCar3);
		clientDAO.save(tmpClient2);

		tmpCar4.addRepair(tmpRepair3);
		tmpWorker3.addRepair(tmpRepair3);
		tmpClient3.add(tmpCar4);
		clientDAO.save(tmpClient3);

		tmpCar5.addRepair(tmpRepair4);
		tmpWorker4.addRepair(tmpRepair4);
		tmpClient4.add(tmpCar5);
		clientDAO.save(tmpClient4);

		tmpCar6.addRepair(tmpRepair5);
		tmpWorker5.addRepair(tmpRepair5);
		tmpClient5.add(tmpCar6);
		clientDAO.save(tmpClient5);
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

		Worker tmpWorker1 = new Worker("Jan", "Nowak", "Mechanik", 25, "12/03/2020", "123456789");
		Worker tmpWorker2 = new Worker("Adam", "Kowalski", "Mechanik", 25, "16/03/2020", "789456123");
		Worker tmpWorker3 = new Worker("Marek", "Papuga", "Magazynier", 25, "12/12/2015", "456789123");
		Worker tmpWorker4 = new Worker("Tomek", "Montana", "Kierowca", 25, "15/09/2006", "123789456");

		Parts tmpPart1 = new Parts("124ABCU12", 78, 89, "Pół ośka lewa");
		Parts tmpPart2 = new Parts("789XYZA15", 40, 89, "Tarcza hamulcowa Brembo - przód");
		Parts tmpPart3 = new Parts("456TYUN18", 5, 89, "Wałek rozrządu VAG");
		Parts tmpPart4 = new Parts("345WSAD17", 7, 89, "Klocki hamulcowe Brembo - przód");

		Repair tmpRepair1 = new Repair("Wymiana oleju", "21/03/2024");
		Repair tmpRepair2 = new Repair("Wymiana kół", "29/02/2024");
		Repair tmpRepair3 = new Repair("Serwis klimatyzacji", "21/06/2021");
		Repair tmpRepair4 = new Repair("Wymiana rozrządu", "15/04/2020");

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

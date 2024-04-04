package com.example.innoteq;

import com.example.innoteq.service.junctionService.DataCopyService;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InnoteqApplication /*implements CommandLineRunner*/ {

	@Autowired
	private DataCopyService dataCopyService;

	public static void main(String[] args) {
		SpringApplication.run(InnoteqApplication.class, args);
		System.out.println("----------------------- THIS IS THE SERVER LOG: -----------------------");
	}

	/*
	Feltölti az "item_product_info" kapcsolótáblát adatokkal.
	A kapcsolótáblát jelenleg nem használja a program, ezért lett kikommentelve.

	Használata esetén bármely osztályba beírható az alábbi kód, ahol használni szeretnénk a funkciót
	az "implements CommandLineRunner" (és a DataCopyService példányosítás) alkalmazásával.
	 */

	/*
	@Override
	public void run(String... args) throws Exception {
		dataCopyService.copyDataToItemProductTable();
	}
	*/

}
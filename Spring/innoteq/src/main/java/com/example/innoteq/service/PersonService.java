package com.example.innoteq.service;

import com.example.innoteq.model.PersonModel;
import org.springframework.stereotype.Service;

@Service
public interface PersonService {

    PersonModel createPerson(PersonModel personModel);

}

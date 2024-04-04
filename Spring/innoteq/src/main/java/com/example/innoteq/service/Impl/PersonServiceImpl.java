package com.example.innoteq.service.Impl;

import com.example.innoteq.model.PersonModel;
import com.example.innoteq.repository.PersonRepository;
import com.example.innoteq.service.PersonService;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@Service
public class PersonServiceImpl implements PersonService {

    private PersonRepository personRepository;

    public PersonServiceImpl(PersonRepository personRepository) {
        super();
        this.personRepository = personRepository;
    }

    @Override
    public PersonModel createPerson(PersonModel personModel) {
        Assert.notNull(personModel, "Itt a Null Pointer Exception-t, hol a Null Pointer Exception!!!");
        return personRepository.save(personModel);
    }

}
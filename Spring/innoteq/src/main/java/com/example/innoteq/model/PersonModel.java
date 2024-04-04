package com.example.innoteq.model;

import com.example.innoteq.pojo.PersonPojo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Entity
@Table(name = "person")
@Data
@AllArgsConstructor
public class PersonModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person_id")
    private Long personId;

    @Column(name = "person_name")
    private String personName;

    public PersonModel() {
        // constructor for controller class
    }

    public PersonModel(PersonPojo personPojo) {
        this.personId = personPojo.getPersonId();
        this.personName = personPojo.getPersonName();
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }
    public void setPersonName(String personName) {
        this.personName = personName;
    }

}
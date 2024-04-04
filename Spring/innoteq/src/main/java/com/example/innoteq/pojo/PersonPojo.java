package com.example.innoteq.pojo;

import com.example.innoteq.model.PersonModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonPojo {

    private Long personId;
    private String personName;

    public PersonPojo(PersonModel personModel){
        this.personId = personModel.getPersonId();
        this.personName = personModel.getPersonName();
    }
}

package com.example.innoteq.service;

import com.example.innoteq.model.SaleModel;
import org.springframework.stereotype.Service;

@Service
public interface SaleService {

    SaleModel createSale(SaleModel saleModel);

}

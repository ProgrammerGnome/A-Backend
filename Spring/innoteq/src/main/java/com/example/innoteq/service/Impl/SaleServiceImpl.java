package com.example.innoteq.service.Impl;

import com.example.innoteq.model.SaleModel;
import com.example.innoteq.repository.SaleRepository;
import com.example.innoteq.service.SaleService;
import org.springframework.stereotype.Service;

@Service
public class SaleServiceImpl implements SaleService {
    private SaleRepository saleRepository;

    public SaleServiceImpl(SaleRepository saleRepository) {
        super();
        this.saleRepository = saleRepository;
    }

    @Override
    public SaleModel createSale(SaleModel saleModel) {
        return saleRepository.save(saleModel);
    }

}

package com.aso.service.status;

import com.aso.model.Status;
import com.aso.model.dto.StatusDTO;
import com.aso.service.IGeneralService;

public interface StatusService extends IGeneralService<Status> {
    StatusDTO findOrderDTOById(Long id);
}

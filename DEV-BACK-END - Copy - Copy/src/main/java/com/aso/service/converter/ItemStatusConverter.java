package com.aso.service.converter;


import com.aso.model.enums.ItemStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;


@Converter
public class ItemStatusConverter implements AttributeConverter<ItemStatus, String> {

    @Override
    public String convertToDatabaseColumn(ItemStatus itemStatus) {
        if (itemStatus == null) {
            return null;
        }
        String itemStatusString = null;
        switch (itemStatus) {
            case NEW : itemStatusString = "NEW";break;
            case USED : itemStatusString = "USED";break;
        }
        return itemStatusString;
    }

    @Override
    public ItemStatus convertToEntityAttribute(String s) {
        if (s == null) {
            return null;
        }
        ItemStatus itemStatus = null;
        switch (s) {
            case "NEW" : itemStatus = ItemStatus.NEW;break;
            case "USED" : itemStatus = ItemStatus.USED;break;
        }
        return itemStatus;
    }
}


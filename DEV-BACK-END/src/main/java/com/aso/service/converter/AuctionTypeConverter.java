package com.aso.service.converter;


import com.aso.model.enums.AuctionType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class AuctionTypeConverter implements AttributeConverter<AuctionType, String> {

    @Override
    public String convertToDatabaseColumn(AuctionType auctionType) {
        if ( auctionType == null ) {
            return null;
        }
        String auctionTypeString = null;
        switch (auctionType) {
            case BUY_NOW:
                auctionTypeString = "BUY_NOW";
                break;
            case BIDDING:
                auctionTypeString = "BIDDING";
                break;
        }
        return auctionTypeString;
    }

    @Override
    public AuctionType convertToEntityAttribute(String s) {
        if ( s == null ) {
            return null;
        }
        AuctionType auctionType = null;
        switch (s) {
            case "BUY_NOW" : auctionType = AuctionType.BUY_NOW;break;
            case "BIDDING" : auctionType = AuctionType.BIDDING;break;
        }
        return auctionType;
    }
}

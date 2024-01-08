import React, { useState } from 'react';
import AvoidedFootprint from './AvoidedFootprint/AvoidedFootprint';
import TotalAvoidedFootprint from './TotalAvoidedFootprint';

export function Body() {
    const [avoidedCarbonFootprint, setAvoidedCarbonFootprint] = useState(0);

    return (
        <div className='container'>
            <TotalAvoidedFootprint />
            <AvoidedFootprint avoidedFootprint={avoidedCarbonFootprint} setAvoidedFootprint={setAvoidedCarbonFootprint} />
        </div>
    );
}

import React from 'react'
import {Candle as CandleModel} from './Model' 
import {scaleLinear} from 'd3-scale'
import Candle from './Candle'
import {Svg} from 'react-native-svg'

interface ChartProps  {
    candles: CandleModel[]
    caliber: number;
    size: number;
    domain: [number, number];
}

export default ({candles, caliber, size, domain}: ChartProps) => {
    const scaley = scaleLinear().domain(domain).range([size, 0])
    const scaleBody = scaleLinear().domain([0, domain[1] - domain[0]]).range([0, size])
    return (
        <Svg width={size} height={size}>
            {
                candles.map((candle, index) => (
                    <Candle key={index} {...{candle, caliber, scaley, scaleBody, index}}/>
                ))
            }
        </Svg>
    )
}
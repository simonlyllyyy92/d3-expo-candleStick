import React from 'react'
import {Candle} from './Model' 
import {ScaleLinear} from 'd3-scale'
import {Line, Rect} from 'react-native-svg'

const MARGIN = 4;

interface CandleProps {
    candle: Candle;
    caliber: number;
    scaley: ScaleLinear<number, number>;
    scaleBody: ScaleLinear<number, number>;
    index: number;
}

export default ({candle: {l, h, o, c}, index, caliber,scaley, scaleBody}: CandleProps) => {
    const x = caliber * index + 0.5 * caliber
    const color = o > c ? "#4AFA9A" : "#E33F64"
    return (
        <>
        <Line 
                x1={x}
                x2={x}
                y1={scaley(h)}
                y2={scaley(l)}
                stroke={color}
                strokeWidth ={1}
        />
        <Rect 
                x={caliber * index + MARGIN}
                y={scaley(Math.max(o, c))}
                width={caliber - MARGIN}
                height={scaleBody(Math.max(o,c) - Math.min(o,c))}
                fill ={color}
            />
        </>
    )
}
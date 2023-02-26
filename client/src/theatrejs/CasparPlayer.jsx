import React, { useState } from 'react'
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { endpoint, executeScript } from '../common'

const CasparPlayer = ({ playtoCasparcg, layerNumber }) => {
    const [duration, setDuration] = useState(2);
    const [loopcount, setLoopcount] = useState(0);

    const pause = layerNumber => {
        endpoint(`call 1-${layerNumber} window.sheet.sequence.pause()`);
        executeScript(`window.sheet_${layerNumber}.sequence.pause()`);
    }
    const resume = layerNumber => {
        endpoint(`call 1-${layerNumber} window.sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        `)
        executeScript(`window.sheet_${layerNumber}.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] })`);
    }
    const stopGraphics1 = (layerNumber) => {
        endpoint(`stop 1-${layerNumber}`);
        executeScript(`
        document.getElementById('divid_${layerNumber}')?.remove();
        `);
    }

    return (
        <div>
            {/* <span>Caspar Control:</span> */}
            <button onClick={() => {
                window.sheet.sequence.position = 0;
                setTimeout(() => {
                    playtoCasparcg(layerNumber, loopcount, duration);
                }, 100);
            }}><FaPlay /></button>
            <button onClick={() => pause(layerNumber)}><FaPause /></button>
            <button title='Resume' onClick={() => resume(layerNumber)}><FaPause /><FaPlay /></button>
            <button onClick={() => stopGraphics1(layerNumber)}><FaStop /></button>
            <span>Duration:</span><input title='Time in second' type="number" value={duration} style={{ width: 30 }} onChange={e => setDuration(e.target.value)} />
            <span title="Put 0 for Infinity">Loop:</span><input title="Put 0 for Infinity" type="number" value={loopcount} style={{ width: 30 }} onChange={e => setLoopcount(e.target.value)} />

        </div>
    )
}

export default CasparPlayer
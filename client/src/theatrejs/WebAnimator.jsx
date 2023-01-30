import React, { useEffect, useState } from 'react'

import studio from '@theatre/studio'
import { getProject, types } from '@theatre/core'
import DrawingforTheatrejs from '../DrawingforTheatrejs'
import { useSelector, useDispatch } from 'react-redux'
import { fabric } from "fabric";


import { endpoint, templateLayers, shadowOptions, executeScript } from '../common'
import { createCircle } from '../DrawingController'

studio.initialize();
studio.ui.hide();

var project = getProject('HTML Animation Tutorial')

const WebAnimator = ({ canvasObjects = { "version": "5.2.4", "objects": [{ "type": "ellipse", "version": "5.2.4", "originX": "left", "originY": "top", "left": 180, "top": 330, "width": 100, "height": 160, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 0.9, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "rx": 50, "ry": 80, "id": "ccg_11", "class": "class_11", "selectable": true }, { "type": "circle", "version": "5.2.4", "originX": "left", "originY": "top", "left": 150, "top": 0, "width": 200, "height": 200, "fill": "#0000ff", "stroke": "#ffffff", "strokeWidth": 3, "strokeDashArray": null, "strokeLineCap": "butt", "strokeDashOffset": 0, "strokeLineJoin": "miter", "strokeUniform": true, "strokeMiterLimit": 4, "scaleX": 1, "scaleY": 1, "angle": 0, "flipX": false, "flipY": false, "opacity": 1, "shadow": { "color": "black", "blur": 30, "offsetX": 0, "offsetY": 0, "affectStroke": false, "nonScaling": false }, "visible": true, "backgroundColor": "", "fillRule": "nonzero", "paintFirst": "fill", "globalCompositeOperation": "source-over", "skewX": 0, "skewY": 0, "radius": 100, "startAngle": 0, "endAngle": 360, "id": "ccg_12", "class": "class_12", "selectable": true }] } }) => {
    const [showStudio, setShowStudio] = useState(true)
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [RCCtheatrepageData, setRCCtheatrepageData] = useState(canvasObjects)
    const [duration, setDuration] = useState(2);
    const [loopcount, setLoopcount] = useState(0);
    const [fabric1, setFabric1] = useState('');
    const [coreonly1, setCoreonly1] = useState('');
    const [projectId, setProjectId] = useState('HTML Animation Tutorial')
    const [htmlfileHandle, sethtmlfileHandle] = useState();

    const clientId = useSelector(state => state.clientIdReducer.clientId);
    window.clientId = clientId;



    var sheet = project.sheet('Sheet 1');
    project.ready.then(() => {
        sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
    });

    const dispatch = useDispatch();

    useEffect(() => {
        studio.ui.restore();
        setRCCtheatrepageData(localStorage.getItem("RCCtheatrepageData"));

        return () => {
            // second  
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
            var fetchfabricjs;
            if (window.location.origin !== 'https://vimlesh1975.github.io') {
                fetchfabricjs = `${process.env.PUBLIC_URL}/js/fabric.min.js`;
            }
            else {
                fetchfabricjs = `/ReactCasparClient/js/fabric.min.js`;
            }
            fetch(fetchfabricjs)
                .then((r) => r.text())
                .then(text => {
                    setFabric1(text);
                })
        }, 2000);

        setTimeout(() => {
            var fetchcoreonly;
            if (window.location.origin !== 'https://vimlesh1975.github.io') {
                fetchcoreonly = `${process.env.PUBLIC_URL}/js/core-only.min.js`;
            }
            else {
                fetchcoreonly = `/ReactCasparClient/js/core-only.min.js`;
            }
            fetch(fetchcoreonly)
                .then((r) => r.text())
                .then(text => {
                    setCoreonly1(text);
                })
        }, 3000);

        return () => {
            // cleanup
        }
        // eslint-disable-next-line
    }, [])

    const hexToRGB = hex => {
        const red = parseInt(hex.slice(1, 3), 16)
        const green = parseInt(hex.slice(3, 5), 16)
        const blue = parseInt(hex.slice(5, 7), 16)
        return { r: red / 255, g: green / 255, b: blue / 255, a: 1 } // return an object
    }
    var mouseDown = 0;
    document.body.onmousedown = function () {
        mouseDown = 1;
    }
    document.body.onmouseup = function () {
        mouseDown = 0;
    }

    const deleteAllObjects = () => {
        canvas.getObjects().forEach(element => {
            project.sheet('Sheet 1').detachObject(element.id)
        })
        canvas.requestRenderAll()
    }

    const initialiseCore = (jsonContent) => {

        canvas.loadFromJSON(jsonContent, () => {
            canvas.getObjects().forEach(element => {
                const obj = sheet.object(element.id, {
                    left: element.left,
                    top: element.top,
                    width: element.width,
                    height: element.height,
                    opacity: types.number(element.opacity, { range: [0, 1] }),
                    scaleX: types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    angle: element.angle,
                    rx: types.number(element.rx ? element.rx : 10, { range: [0, 100] }),
                    ry: types.number(element.ry ? element.rx : 10, { range: [0, 100] }),
                    strokeWidth: types.number(element.strokeWidth, { range: [0, 100] }),
                    fontSize: types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),

                    fill: (element.fill.r === undefined) ? (types.rgba(hexToRGB(element.fill ? element.fill : '#ff0000'))) : (types.rgba(element.fill)),
                    stroke: (element.stroke?.r === undefined) ? (types.rgba(hexToRGB(element.stroke ? element.stroke : '#000000'))) : (types.rgba(element.stroke)),
                    shadow: { ...shadowOptions, color: (element.shadow.color.r === undefined) ? (types.rgba(hexToRGB(element.shadow.color ? element.shadow.color : '#000000'))) : (types.rgba(element.shadow.color)), blur: types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },

                    skewX: types.number(element.skewX, { range: [-88, 88] }),
                    skewY: types.number(element.skewY, { range: [-60, 60] }),
                }, { reconfigure: true });

                obj.onValuesChange((obj) => {
                    element.set({
                        left: obj.left,
                        top: obj.top,
                        width: obj.width,
                        height: obj.height,
                        opacity: obj.opacity,
                        scaleX: obj.scaleX,
                        scaleY: obj.scaleY,
                        angle: obj.angle,
                        rx: obj.rx,
                        ry: obj.ry,
                        strokeWidth: obj.strokeWidth,
                        fontSize: obj.fontSize,
                        strokeDashArray: [obj.strkdsar, obj.strkdsar],
                        strokeDashOffset: obj.strkDsOfst,
                        fill: obj.fill,
                        stroke: obj.stroke,
                        shadow: obj.shadow,
                        skewX: obj.skewX,
                        skewY: obj.skewY,
                    });
                    element.setCoords();
                    canvas.requestRenderAll();
                });
                const onMouseMove = (obj, event) => {
                    if (mouseDown === 1) {
                        studio.transaction(({ set }) => {
                            set(obj.props.left, event.target.left);
                            set(obj.props.top, event.target.top);
                            set(obj.props.width, event.target.width);
                            set(obj.props.angle, event.target.angle);
                        });
                    }
                };
                const onScaling = (obj, event) => {
                    studio.transaction(({ set }) => {
                        set(obj.props.scaleX, event.transform.target.scaleX);
                        set(obj.props.scaleY, event.transform.target.scaleY);
                    });
                };
                const onMousedblclick = (obj, event) => {
                    studio.transaction(({ unset }) => {
                        unset(obj.props);
                    });
                };
                element.on("mousedown", () => studio.setSelection([obj]), false);
                element.on("mousemove", (e) => onMouseMove(obj, e), false);
                element.on("scaling", (e) => onScaling(obj, e), false);
                element.on("mousedblclick", (e) => onMousedblclick(obj, e), false);
            })
        })
    }
    const reset = () => {
        localStorage.removeItem("theatre-0.4.persistent");
        window.location.reload();
    }

    const pause = layerNumber => {
        endpoint(`call 1-${layerNumber} sheet.sequence.pause()`);
        executeScript(`sheet.sequence.pause()`);
    }
    const resume = layerNumber => {
        endpoint(`call 1-${layerNumber} sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        `)
        executeScript(`sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] })`);

    }
    const playtoCasparcg = (layerNumber = templateLayers.theatrejs) => {
        const content = JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']));
        const content2 = content.replaceAll('"', '\\"');
        const state1 = (JSON.stringify(studio.createContentOfSaveFile(projectId)));

        const scriptforhtmlweb = `
        document.getElementById('divid_${layerNumber}')?.remove();
        var aa = document.createElement('div');
        aa.style.position='absolute';
        aa.setAttribute('id','divid_' + '${layerNumber}');
        document.body.style.overflow='hidden';
        aa.innerHTML += \`<canvas id='canvas' width='1920' height='1080'></canvas>;\`;
        document.body.appendChild(aa);
        var canvas = new fabric.Canvas('canvas');
        const content =\`${content2}\`;
        const shadowOptions = {
            color: 'black',
            blur: 30,
            offsetX: 0,
            offsetY: 0,
            affectStroke: false
        };
        __TheatreJS_StudioBundle._studio.initialize();
        __TheatreJS_StudioBundle._studio.ui.hide();
        canvas.loadFromJSON(content,()=>{
            const { core } = __TheatreJS_StudioBundle._coreBundle._studio;
            window.project = core.getProject('${'project' + fabric.Object.__uid++}', {state:${(state1.replaceAll('"', "'")).replaceAll("\\'", '\\"')}});
            window.sheet = project.sheet('Sheet 1');
            project.ready.then(() => {
                sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
            });
            canvas.getObjects().forEach(element => {
                const obj = sheet.object(element.id, {
                    left: element.left,
                    top: element.top,
                    width: element.width,
                    height: element.height,
                    opacity: core.types.number(element.opacity, { nudgeMultiplier: 0.1 }),
                    scaleX: core.types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                    scaleY: core.types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                    angle: element.angle,
                    rx: core.types.number(element.rx ? element.rx : 10, { range: [0, 100] }),
                    ry: core.types.number(element.ry ? element.rx : 10, { range: [0, 100] }),
                    strokeWidth: core.types.number(element.strokeWidth, { range: [0, 100] }),
                    fontSize: core.types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                    strkdsar: core.types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                    strkDsOfst: core.types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                    fill: core.types.rgba(element.fill),
                    stroke:core.types.rgba(element.stroke),
                    shadow: { ...shadowOptions, color: core.types.rgba(element.shadow.color), blur: core.types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                    skewX: core.types.number(element.skewX, { range: [-60, 60] }),
                    skewY: core.types.number(element.skewY, { range: [-60, 60] }),

                });
                obj.onValuesChange((obj) => {
                        element.set({
                            left: obj.left,
                            top: obj.top,
                            width: obj.width,
                            height: obj.height,
                            opacity: obj.opacity,
                            scaleX: obj.scaleX,
                            scaleY: obj.scaleY,
                            angle: obj.angle,
                            rx: obj.rx,
                            ry: obj.ry,
                            strokeWidth: obj.strokeWidth,
                            fontSize: obj.fontSize,
                            strokeDashArray: [obj.strkdsar, obj.strkdsar],
                            strokeDashOffset: obj.strkDsOfst,
                            fill: obj.fill,
                            stroke: obj.stroke,
                            shadow: obj.shadow,
                            skewX: obj.skewX,
                            skewY: obj.skewY,
                        });
                        element.setCoords();
                        canvas.renderAll();
                });
            });
        });
        `
        executeScript(scriptforhtmlweb);
        endpoint(`play 1-${layerNumber} [html] "http://localhost:10000/ReactCasparClient/Theatrejs2"`);
        endpoint(`call 1-${layerNumber} "${scriptforhtmlweb}"`)
    }

    const stopGraphics1 = (layerNumber) => {
        endpoint(`stop 1-${layerNumber}`);
        executeScript(`document.getElementById('divid_${layerNumber}')?.remove();`);

    }
    const exportHtml = async () => {
        const xx4 = `canvas.getObjects().forEach(element => {
            var obj = sheet.object(element.id, {
                left: element.left,
                left: element.left,
                top: element.top,
                width: element.width,
                height: element.height,
                opacity: core.types.number(element.opacity, { nudgeMultiplier: 0.1 }),
                scaleX: core.types.number(element.scaleX, { nudgeMultiplier: 0.01 }),
                scaleY: core.types.number(element.scaleY, { nudgeMultiplier: 0.01 }),
                angle: element.angle,
               
                rx: core.types.number(element.rx ? element.rx : 10, { range: [0, 100] }),
                ry: core.types.number(element.ry ? element.rx : 10, { range: [0, 100] }),
                strokeWidth: core.types.number(element.strokeWidth, { range: [0, 100] }),
               
                fontSize: core.types.number(element.fontSize ? parseInt(element.fontSize) : 30, { range: [0, 100] }),
                strkdsar: core.types.number(element.strokeDashArray ? parseInt(element.strokeDashArray) : 0, { range: [0, 1000] }),
                strkDsOfst: core.types.number(element.strokeDashOffset ? parseInt(element.strokeDashOffset) : 0, { range: [-1000, 1000] }),
                fill: core.types.rgba(element.fill),
                stroke:core.types.rgba(element.stroke),
                shadow: { ...shadowOptions, color: core.types.rgba(element.shadow.color), blur: core.types.number(parseInt(element.shadow.blur), { range: [0, 100] }) },
                skewX: core.types.number(element.skewX, { range: [-60, 60] }),
                skewY: core.types.number(element.skewY, { range: [-60, 60] }),
            });`

        const xx5 = ` obj.onValuesChange((obj) => {
                element.set({
                    left: obj.left,
                    top: obj.top,
                    width: obj.width,
                    height: obj.height,
                    opacity: obj.opacity,
                    scaleX: obj.scaleX,
                    scaleY: obj.scaleY,
                    angle: obj.angle,
                    rx: obj.rx,
                    ry: obj.ry,
                    strokeWidth: obj.strokeWidth,
                  
                    fontSize: obj.fontSize,
                    strokeDashArray: [obj.strkdsar, obj.strkdsar],
                    strokeDashOffset: obj.strkDsOfst,
                    fill: obj.fill,
                    stroke: obj.stroke,
                    shadow: obj.shadow,
                    skewX: obj.skewX,
                    skewY: obj.skewY,
                });
                element.setCoords();
                canvas.requestRenderAll();
            });`

        const aa =
            `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <script>${fabric1}<//script>
                <script>${coreonly1}<//script>
        </head>

        <body style="overflow:hidden">

    <canvas id="canvas" width="1920" height="1080"></canvas>
    <script type="module">
    const hexToRGB = hex => {
        const red = parseInt(hex.slice(1, 3), 16)
        const green = parseInt(hex.slice(3, 5), 16)
        const blue = parseInt(hex.slice(5, 7), 16)
        return {r:red/255, g:green/255, b:blue/255, a:1} // return an object
        // return [ r, g, b ]
    }
         const shadowOptions = {
            color: 'black',
            blur: 30,
            offsetX: 0,
            offsetY: 0,
            affectStroke: false
        };
        var canvas = new fabric.Canvas('canvas');
        window.canvas=canvas;
        canvas.preserveObjectStacking = true;
        const content =${JSON.stringify(canvas.toJSON(['id', 'class', 'selectable']))};
        const { core } = Theatre
        const project = core.getProject('${projectId}', {state:${JSON.stringify(studio.createContentOfSaveFile(projectId))}});
        const sheet = project.sheet('Sheet 1')
        canvas.loadFromJSON(content, ()=> {
            ${xx4}
            ${xx5}
        })
        });
        project.ready.then(() => {
            sheet.sequence.play({ iterationCount: ${(parseInt(loopcount) === 0) ? Infinity : parseInt(loopcount)}, range: [0, ${duration}] });
        })
         <//script>
         </body>
     </html>`

        const bb = aa.replaceAll('<//', '</')
        const file = new Blob([bb], { type: 'text/html' });
        var ss = new Date().toLocaleTimeString('en-US', { year: "numeric", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
        const options = {
            suggestedName: ss,
            types: [{
                description: 'Html file',
                accept: { 'text/html': ['.html'] },
            }],
        };
        const aa1 = await window.showSaveFilePicker(options);
        sethtmlfileHandle(aa1.name)
        const writable = await aa1.createWritable();
        await writable.write(file);
        await writable.close();
    }

    const importHtml = async () => {


        const [aa] = await window.showOpenFilePicker();

        if (aa) {

            sethtmlfileHandle(aa.name);
            deleteAllObjects()
            const file = await aa.getFile();
            const content = await file.text();
            var canvasContent = content.split('const content =')[1].split(';')[0];
            var animationContetent = content.split('{state:')[1].split('});')[0];

            console.log(animationContetent);
            const pid = `project${fabric.Object.__uid++}`;
            project = getProject(pid, { state: JSON.parse(animationContetent) });
            setProjectId(pid)

            sheet = project.sheet('Sheet 1');
            project.ready.then(() => {
                sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] });
            });

            initialiseCore(canvasContent);
        }

    }

    const addCircle = () => {
        createCircle(canvas);
        initialiseCore(canvas.toJSON(['id']))
    }

    return (<>

        <div style={{ textAlign: 'center' }}>

            <button onClick={() => addCircle()}>Add circle</button>
            <button onClick={() => {
                if (showStudio) {
                    studio.ui.hide();
                }
                else {
                    studio.ui.restore();
                }
                setShowStudio(val => !val);

            }}>{showStudio ? 'Hide Studio' : 'Show Studio'}</button>
            <button onClick={() => {
                deleteAllObjects();
                initialiseCore(RCCtheatrepageData);
            }}>initialiseCore</button>
            <button onClick={() => reset()}>Reset</button>
            <span title="Put 0 for Infinity">Loop Count:</span><input title="Put 0 for Infinity" type="number" value={loopcount} style={{ width: 30 }} onChange={e => setLoopcount(e.target.value)} />
            <span>Duration:</span><input type="number" value={duration} style={{ width: 30 }} onChange={e => setDuration(e.target.value)} />
            <button onClick={() => playtoCasparcg(templateLayers.theatrejs)}>Play</button>
            <button onClick={() => pause(templateLayers.theatrejs)}>pause</button>
            <button onClick={() => resume(templateLayers.theatrejs)}>resume</button>

            <button onClick={() => stopGraphics1(templateLayers.theatrejs)}>Stop</button>
            <button onClick={() => exportHtml()}>Export Html</button>
            {/* {htmlfileHandle && htmlfileHandle.name} {htmlfileHandle && <button onClick={() => OverrightHtml()}>Overwrite</button>} */}
            {htmlfileHandle}
            <button onClick={() => importHtml()}>Import Html</button>


            Client Id<input title='Put Unique Id so that other may not iterfere' style={{ width: 100 }} type={'text'} value={clientId} onChange={e => {
                dispatch({ type: 'CHANGE_CLIENTID', payload: e.target.value })
            }} />

            {projectId}

            <DrawingforTheatrejs />
        </div>
    </>)
}

export default WebAnimator
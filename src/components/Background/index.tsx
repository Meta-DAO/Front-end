/* eslint no-use-before-define: 0 */
import React, { useEffect } from "react";
import "./background.scss";
import BlobsTop from "../../../../assets/icons/landing-blobs-top.png";
import BlobsCenter from "../../../../assets/icons/landing-blobs-center.png";

function Background({ drawMountains = "true", shouldRain = "true", useFallBackLightning = "false" }) {
    // const _window: Window = window;
    // _window?.CP && (_window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 60000);
    let c1: HTMLCanvasElement;
    let c2: HTMLCanvasElement;
    let c3: HTMLCanvasElement;
    let c4: HTMLCanvasElement;
    let c5: HTMLCanvasElement;
    let c6: HTMLCanvasElement;

    var OK = true;
    let canvii = [];
    var numBranches: number;
    var MINWAIT = 0;
    var MAXWAIT = 3000;

    var miniMode: boolean;
    var LW: number;
    let body: any;

    //clouds
    var clouds: { x: any; y: any; size: any; r: any; g: any; b: any }[];
    var lightningClouds: string | any[];
    var drawClouds: boolean;
    var drawMtns;
    var spaceMode;

    //color
    const RAIN = { r: 174, g: 194, b: 224, a: 0.1 };
    const RAINSTRING = getRGBA(RAIN);
    var rainColorString: string;
    var lightningColor;
    var lightningColorString: string;
    var shadowColor: { r: any; g: any; b: any };
    var shadowColorString: string;
    var altRainColorString: string;
    var bgColor;

    let clickHandler = async function (firstTime = false) {
        init();
    };

    let bounceHandler = debounce(clickHandler, 500, true);

    useEffect(() => {
        bounceHandler();
        window.addEventListener("onresize", bounceHandler);
        c5?.addEventListener("click", bounceHandler);
    }, []);

    /*******************/
    /*PRIMARY functions*/
    /*******************/
    async function init() {
        body = document.querySelector("body");
        c1 = document.getElementById("c1") as HTMLCanvasElement;
        c2 = document.getElementById("c2") as HTMLCanvasElement;
        c3 = document.getElementById("c3") as HTMLCanvasElement;
        c4 = document.getElementById("c4") as HTMLCanvasElement;
        c5 = document.getElementById("c5") as HTMLCanvasElement;
        c6 = document.getElementById("c6") as HTMLCanvasElement;

        canvii = [c1, c2, c3, c4, c5, c6];

        scaleCanvas(canvii);
        miniMode = c1.width < 400;
        LW = miniMode ? 2 : 4;
        clouds = [];
        lightningClouds = new Array(2).fill(0).map(e => (e = []));

        // spaceMode = chance);
        spaceMode = false;
        drawClouds = true;
        drawMtns = drawMountains == "true";
        const rainMode = shouldRain == "true";
        // drawClouds = chance();
        // drawMtns = chance(0.7);
        lightningColor = { r: rand(210, 265), g: rand(210, 245), b: rand(210, 265) };
        lightningColorString = getRGBA(lightningColor);
        shadowColor = { r: rand(0, 275), g: rand(0, 245), b: rand(0, 275) };
        shadowColorString = getRGBA(shadowColor);
        altRainColorString = getRGBA({ r: shadowColor.r, g: shadowColor.g, b: shadowColor.b, a: 0.5 });

        if (!spaceMode) {
            body.style.backgroundImage = `linear-gradient(rgb(${rand(0, 30)},${rand(0, 10)},${rand(0, 70)}), rgb(${rand(0, 50)},${rand(0, 20)},${rand(0, 80)}))`;
        } else {
            body.style.backgroundColor = `rgb(${rand(0, 25)},${rand(0, 25)},${rand(0, 50)})`;
            body.style.backgroundImage = generateStarField(false, false);
        }
        if (drawClouds) {
            if (chance(0.75)) {
                //moon
                let ctxx = c6.getContext("2d");
                if (ctxx) {
                    ctxx.fillStyle = shadowColorString;
                    ctxx.strokeStyle = shadowColorString;
                    ctxx.shadowColor = shadowColorString;
                    ctxx.shadowBlur = 20;
                    ctxx?.beginPath();
                    ctxx?.arc(c6.width * 0.9, c6.height * 0.1, 100, 0, 2 * Math.PI);
                    ctxx?.fill();
                }
            }
            c3.style.backgroundImage = generateStarField(false, true);
        } else {
            c3.style.backgroundImage = "none";
        }
        if (drawMtns) {
            //(mtns or forest)
            // c4.style.backgroundImage = `url(https://assets.codepen.io/1197275/${
            //     chance() ? 'Lightning_fg1' : 'Lightning_fg2'
            // }.PNG)`;

            c4.style.backgroundImage = `url(https://assets.codepen.io/1197275/Lightning_fg2.PNG)`;
        } else {
            c4.style.backgroundImage = "none";
        }
        if (rainMode) {
            rain(c5, c5?.getContext("2d"), rand(-7, 7), rand(30, 60));
        }

        if (!useFallBackLightning) {
            let numLightningCanvases = miniMode ? 1 : 2;
            for (let i = 0; i < numLightningCanvases; i++) {
                let c = canvii[i];
                let ctx = c.getContext("2d");
                // await sleep(0, 2000);
                await sleep(2000);

                if (ctx) {
                    generateLightning(c, ctx);
                }
            }
        }
    }

    async function generateLightning(
        c: { width: any; height: any },
        ctx: { lineCap: string; strokeStyle: any; shadowColor: any; shadowBlur: number; lineWidth: number; clearRect: (arg0: number, arg1: number, arg2: any, arg3: any) => void },
    ) {
        if (!OK) return false;
        ctx.lineCap = "round";
        numBranches = 0;

        let start = new (Point as any)(Math.floor(c1.width * Math.random()), 0);
        var steppedLeaders: {}[] = [];

        let bolt = getBolt(c, start, false);
        //added depth first, so reverse them now to draw in the right order. that way we can decrease lineWidth with every new branch
        steppedLeaders.reverse();

        let isGround = isGroundStrike(bolt);
        let strobes = isGround ? rand(2, 5) : chance() ? 1 : rand(1, 3);
        for (let i = 0; i < strobes; i++) {
            await throwBolt(bolt, pick(lightningClouds)); //we pass in the light-colored cloud set for the "lit up cloud" effect.
        }

        await sleep(rand(MINWAIT, MAXWAIT));
        generateLightning(c, ctx);

        ////////////////// Primary Helper Functions //////////////////
        async function throwBolt(bolt: {}, lightClouds: any) {
            ctx.strokeStyle = lightningColorString;
            ctx.shadowColor = shadowColorString;
            ctx.shadowBlur = 1;

            let groundStrike = isGroundStrike(bolt);

            //change rain color on strike:
            rainColorString = altRainColorString;
            //light up clouds on strike:
            if (drawClouds) c3.style.backgroundImage = generateStarField(true, true, lightClouds);
            //light up foreground on strike:
            c4.style.filter = `brightness(${groundStrike ? 2000 : rand(200, 800)}%)`;

            //draw main branch, but only lightly at first
            ctx.lineWidth = 1;
            await connect(ctx, bolt, 10);
            ctx.lineWidth = LW;

            for await (const leader of steppedLeaders) {
                ctx.lineWidth = ctx.lineWidth / 2;
                if (ctx.lineWidth > 0.1) {
                    await connect(ctx, leader, rand(10, 100)); //<--using higher number now means faster lightning but you can't really see it moving downward.
                }
            }
            ctx.lineWidth = groundStrike ? LW * 2 : LW;
            await connect(ctx, bolt, 25);
            await sleep(rand(0, 50));

            //now back to darker colors and remove bolt
            c4.style.filter = "brightness(100%)";
            if (drawClouds) c3.style.backgroundImage = generateStarField(false, true);
            rainColorString = RAINSTRING;
            ctx.clearRect(0, 0, c.width, c.height);
        }
        function getBolt(c: any, start: { x: number; y: number }, isLeader: boolean, branchLength?: number, depthLevel?: number) {
            const BRANCHMAX = rand(0, 10);
            let bolt: any = {};
            bolt["depthLevel"] = depthLevel || 1;
            let second;
            second = new (Point as any)(start.x + rand(-50, 50), start.y + rand(-10, 50));
            let pts = [start, second];
            let point_index = 2;

            let chosenBranchLength = rand(100, 350);

            if (isLeader && branchLength) {
                chosenBranchLength = branchLength;
            }

            // const iterations = isLeader ? branchLength : rand(100, 350);
            for (let i = 0; i < chosenBranchLength; i++) {
                let limit = isLeader ? 200 : 350;
                let maxDistToNextBend = rand(10, 100);
                do {
                    if (limit-- < 0) {
                        break;
                    }
                    var next = randomPoint();
                } while (
                    distance(next, pts[point_index - 1]) > maxDistToNextBend ||
                    !sameDirection(pts[point_index - 2], pts[point_index - 1], next) ||
                    Math.abs(next.x - pts[point_index - 1].x) > 50
                );
                if (limit > 0) {
                    pts.push(next);
                    point_index++;
                }
            }
            let reversedPoints = chance() ? pts : [...pts].reverse(); //affects which branches are longer (2nd way makes longer at bottom)
            for (let i = 0; i < reversedPoints.length; i++) {
                let probabilityOfBranch = 0.1; //Math.random()*(1-numBranches/BRANCHMAX);
                if (numBranches < BRANCHMAX && chance(probabilityOfBranch)) {
                    numBranches++;
                    let branchLength = rand(50, 100);
                    let leader = getBolt(c, reversedPoints[i], true, branchLength, numBranches);
                    steppedLeaders.push(leader);
                }
            }
            bolt.points = pts;
            return bolt;
        }
        async function connect(ctx: any, bolt: any, updateEvery: any) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(bolt.points[0].x, bolt.points[0].y);

            let controlPoints = [];
            for (let i = 0; i < bolt.points.length - 1; i++) {
                let start = bolt.points[i];
                let end = bolt.points[i + 1] || bolt.points[0];

                let line = new (LineMetrics as any)(start, end);

                let xp1 = start.x + line.run / 4;
                let yp1 = line.m * xp1 + line.b;

                let xp2 = start.x + (3 / 4) * line.run;
                let yp2 = line.m * xp2 + line.b;

                const curveFactor = rand(5, 20);
                let cp1x, cp1y, cp2x, cp2y;

                cp1x = xp1 + -line.rise / curveFactor;
                cp1y = yp1 + line.run / curveFactor;
                cp2x = xp2 + line.rise / curveFactor;
                cp2y = yp2 - line.run / curveFactor;
                controlPoints.push(new (Point as any)(cp1x, cp1y));
                controlPoints.push(new (Point as any)(cp2x, cp2y));

                ctx.bezierCurveTo(cp2x, cp2y, cp1x, cp1y, end.x, end.y);
                ctx.stroke();
                ctx.restore();

                if (i % updateEvery == 0) await sleep(0);
            }

            bolt.controlPoints = controlPoints;
            return bolt;
        }
    }

    /*adapted from Max Ruigewaard's pen: https://codepen.io/ruigewaard/pen/JHDdF*/
    function rain(canvas: { width: any; height: any }, ctx: any, xShift: number, yShift: number) {
        var w = canvas.width;
        var h = canvas.height;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        var TIMERID: NodeJS.Timeout;

        var init = [];
        var maxParts = miniMode ? 500 : 1000;
        let lengthMultiplier = Math.random() * 2;
        for (var a = 0; a < maxParts; a++) {
            init.push({
                x: 2 * w * Math.random() - w / 2,
                y: Math.random() * h,
                l: Math.random() * lengthMultiplier + 0.5,
                xs: xShift,
                ys: yShift,
            });
        }

        var particles: string | any[] = [];
        for (var b = 0; b < maxParts; b++) {
            particles[b] = init[b];
        }

        function draw() {
            if (!OK) {
                clearInterval(TIMERID);
                return false;
            }
            ctx.clearRect(0, 0, w, h);
            ctx.strokeStyle = rainColorString;
            for (var c = 0; c < particles.length; c++) {
                var p = particles[c];

                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);

                ctx.stroke();
            }
            move();
        }

        function move() {
            for (var b = 0; b < particles.length; b++) {
                var p = particles[b];
                p.x += p.xs;
                p.y += p.ys;
                if (p.y > h) {
                    p.x = 2 * w * Math.random() - w / 2;
                    p.y = rand(-300, -20);
                }
            }
        }
        TIMERID = setInterval(draw, 30);
    }

    /*******************/
    /*helper functions*/
    /*******************/
    function sameDirection(p1: { y: number; x: number }, p2: { y: number; x: number }, p3: { y: number; x: number }) {
        //1/1000 chance of not going in same direction.
        let down = p1.y - p2.y > 0;
        let right = p1.x - p2.x < 0;
        let vertGood, horGood;
        vertGood = chance(0.001) || (down ? p2.y - p3.y > 0 : p2.y - p3.y < 0);
        horGood = chance(0.001) || (right ? p2.x - p3.x < 0 : p2.x - p3.x > 0);
        return vertGood && horGood;
    }

    function isGroundStrike(bolt: { points?: any }) {
        return bolt.points.slice(-1)[0].y >= Math.floor(c1.height - 10);
    }

    /*UTILITY FUNCTIONS*/
    function getRGBA(obj: { r: any; g: any; b: any; a?: any }) {
        return `rgba(${obj.r},${obj.g},${obj.b},${obj.a == undefined ? 1 : obj.a})`;
    }

    function rand(min: number, max: number) {
        return Math.floor(randFloat(min, max));
    }

    function randFloat(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    function pick(arr: string | any[]) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function chance(limit = 0.5) {
        return Math.random() < limit;
    }

    function scaleCanvas(els: any[]) {
        els.forEach((el: any) => {
            let rect = el?.getBoundingClientRect();

            el.width = rect?.width;
            el.height = rect?.height;
            el?.getContext("2d").clearRect(0, 0, el.width, el.height);
        });
    }

    class Point {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }

    function randomPoint(c?: undefined) {
        return new (Point as any)(Math.floor(c1.width * Math.random()), Math.floor(c1.height * Math.random()));
    }

    class LineMetrics {
        run: number;
        rise: number;
        m: number;
        b: number;
        len: number;

        constructor(start: { x: number; y: number }, end: { x: number; y: number }) {
            this.run = end.x - start.x;
            this.rise = end.y - start.y;
            this.m = this.rise / this.run;
            this.b = start.y - this.m * start.x;
            this.len = Math.sqrt(Math.pow(this.run, 2) + Math.pow(this.rise, 2));
        }
    }

    function distance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }

    function sleep(ms: number | undefined) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function debounce(this: any, func: { (firstTime?: boolean): Promise<void>; apply?: any }, wait: number | undefined, immediate: boolean) {
        var timeout: any;
        const _this = this as any;
        return function () {
            var context = _this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function generateStarField(isForLightning: boolean, isClouds: boolean, lightClouds?: any[]) {
        //(generates both the stars and the clouds, they're both radial gradient backgrounds)//
        //is at bottom cuz this function's template string destroys codepen's highlighting.
        let MIN = isClouds ? 10 : 256;
        let MAX = isClouds ? 25 : 256;
        let greenMin = rand(0, MIN);
        let blueMin = rand(0, MIN);
        let redMin = rand(0, MIN);
        let redMax = rand(redMin, MAX);
        let blueMax = rand(blueMin, MAX);
        let greenMax = rand(greenMin, MAX);
        let bigRatio = Math.random() * 0.015;
        let s = ``;
        let nebMin = randFloat(miniMode ? 0 : 50, miniMode ? 25 : 100);
        let nebMax = randFloat(miniMode ? 25 : 100, miniMode ? 75 : 200);
        let density = miniMode ? pick([200, 400, 600, 800, 1000]) : pick([1000, 2000, 3000, 4000, 5000]);

        let myClouds: any[] = [];

        if (isForLightning) {
            myClouds = lightClouds as any[];
        } else {
            myClouds = clouds;
        }
        let iterations = clouds.length > 0 ? clouds.length : isClouds ? rand(250, 350) : density;

        for (let i = 0; i < iterations; i++) {
            let currentCloud = myClouds[i] || null;
            let r = currentCloud?.r || rand(redMin, redMax); //rand(lightningColor.r-240,lightningColor.r-200);/
            let g = currentCloud?.g || rand(greenMin, greenMax); //rand(lightningColor.g-240,lightningColor.g-200);
            let b = currentCloud?.b || rand(blueMin, blueMax); ///rand(lightningColor.b-240,lightningColor.b-200);//
            let isBigStar = !isForLightning && !isClouds && chance(bigRatio);
            let size = currentCloud?.size || (isClouds ? randFloat(nebMin, nebMax) : isBigStar ? randFloat(2, 6) : randFloat(0.1, 3));
            let posX = currentCloud?.x || randFloat(0, 100);
            let posY = currentCloud?.y || randFloat(0, isClouds ? 20 : 100);
            if (isBigStar) {
                s += `radial-gradient(${size}px circle at ${posX}% ${posY}%, rgba(${r},${g},${b},${isClouds ? 0.3 : 1}) 0%, transparent 100%),radial-gradient(${
                    size / 2
                }px circle at ${posX}% ${posY}%, white 2px, transparent 100%),`;
            } else {
                s += `radial-gradient(${size}px circle at ${posX}% ${posY}%, rgba(${r},${g},${b},${isClouds ? 0.3 : 1}) 0%, transparent 100%),`;
            }
            let firstTimeMakingClouds = !currentCloud && isClouds;
            if (firstTimeMakingClouds) {
                clouds.push({ x: posX, y: posY, size: size, r: r, g: g, b: b });

                for (let ii = 0; ii < lightningClouds.length; ii++) {
                    const colorVariation = rand(-25, 75);
                    lightningClouds[ii].push({
                        x: posX,
                        y: posY,
                        size: size,
                        r: shadowColor.r / 6 + colorVariation,
                        g: shadowColor.g / 6 + colorVariation,
                        b: shadowColor.b / 6 + colorVariation,
                    });
                }
            }
        }
        return s.replace(/,$/, "");
    }

    return (
        <div className="landing-background">
            {/* Moon */}
            <canvas id="c6"></canvas>
            {useFallBackLightning && <div id="fallback-lightning">asd</div>}
            {/* Lightning */}
            <canvas id="c1"></canvas>
            {/* Lightning */}
            <canvas id="c2"></canvas>
            {/* Clouds */}
            <canvas id="c3"></canvas>
            {/* Forest */}
            <canvas id="c4"></canvas>
            {/* Rain */}
            <canvas id="c5"></canvas>
        </div>
    );
}

export default Background;

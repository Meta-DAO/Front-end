import MimSvg from "../assets/tokens/MIM.svg";
import { Icon } from "@material-ui/core";
import WavaxSvg from "../assets/tokens/AVAX.svg";

function getMimTokenImage() {
    const viewBox = "0 0 32 32";
    const style = { height: "32px", width: "32px" };

    return (
        //@ts-ignore
        <Icon viewBox={viewBox} style={style}>
            {/* @ts-ignore */}
            <img src={MimSvg} viewBox={viewBox} style={style} />
        </Icon>
    );
}

function getWavaxTokenImage() {
    const viewBox = "0 0 32 32";
    const style = { height: "32px", width: "32px" };

    return (
        //@ts-ignore
        <Icon viewBox={viewBox} style={style}>
            {/* @ts-ignore */}
            <img src={WavaxSvg} viewBox={viewBox} style={style} />
        </Icon>
    );
}

export function getTokenImage(name: string): JSX.Element {
    if (name === "mim") return getMimTokenImage();
    if (name === "wavax") return getWavaxTokenImage();

    throw Error(`Token image doesn't support: ${name}`);
}

function toUrl(base: string): string {
    const url = window.location.origin;
    return url + base;
}

export function getTokenUrl(name: string) {
    if (name === "meta") {
        const path = require("../assets/tokens/META.svg").default;
        return toUrl(path);
    }

    if (name === "smeta") {
        const path = require("../assets/tokens/sMETA.svg").default;
        return toUrl(path);
    }

    throw Error(`Token url doesn't support: ${name}`);
}

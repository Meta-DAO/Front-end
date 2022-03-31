import React from "react";
import "./landing.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Link } from "@material-ui/core";
import Logo from "../../assets/images/logo.png";

function Landing() {
    return (
        <div className="landing-root">
            <div className="bg-video-wrap">
                <video
                    src="https://firebasestorage.googleapis.com/v0/b/misc-a3aff.appspot.com/o/storm-compressed.mp4?alt=media&token=3685727c-c125-4338-b347-979f06e4bc7d"
                    loop
                    muted
                    autoPlay={true}
                ></video>
            </div>
            <div className="root-wrapper">
                <Header />
                <div className="landing-main">
                    <div className="landing-main-title-wrap">
                        <img src={Logo} />
                        {/* <p>The Decentralized</p>
                        <p>Wonderland</p> */}
                    </div>
                    <div className="landing-main-help-text-wrap">
                        <p>Financial tools to grow your wealth - stake and earn</p>
                        <p>compounding interest on the Avalanche Network</p>
                    </div>
                    <div className="landing-main-btns-wrap">
                        <Link href={`https://app.${process.env.REACT_APP_URL}`} target="_blank" rel="noreferrer">
                            <div className="landing-main-btn">
                                <p>Enter App</p>
                            </div>
                        </Link>
                        <Link href={process.env.REACT_APP_DOC_LINK} target="_blank" rel="noreferrer">
                            <div className="landing-main-btn">
                                <p>Documentation</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Landing;

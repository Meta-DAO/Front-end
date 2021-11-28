import React from "react";
import { Link } from "@material-ui/core";
import "./main.scss";
import Logo from "../../../../assets/icons/logo-light.svg";

function Main() {
    return (
        <div className="landing-main">
            <div className="landing-main-img-wrap">
                <img src={Logo} alt="" />
            </div>
            {/* <div className="landing-main-btns-wrap">
                <Link href="https://app.wonderland.money" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Enter App</p>
                    </div>
                </Link>
                <Link href="https://wonderland.gitbook.io/wonderland/" target="_blank" rel="noreferrer">
                    <div className="landing-main-btn">
                        <p>Documentation</p>
                    </div>
                </Link>
            </div> */}
            <div className="landing-main-help-text-wrap">
                <p>Financial tools to grow your wealth - stake</p>
                <p>and earn compounding interest.</p>
            </div>
            <div className="landing-main-btns-wrap">
                <div className="landing-coming-soon-btn landing-main-btn">
                    <p>Coming soon</p>
                </div>
            </div>
        </div>
    );
}

export default Main;

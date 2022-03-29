import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import commonSettings from "./global";

const lightTheme = {
    color: "rgb(37, 52, 73)",
    white: "#ffffff",
    gold: "#F8CC82",
    gray: "#A3A3A3",
    textHighlightColor: "#93AEBC", // "#F4D092",
    backgroundColor: "#AFCDE9",
    // background:
    // "radial-gradient(circle at 25% 0%, rgba(227,255,240,.5), rgba(227,255,240,0) 50%), radial-gradient(circle at 80% 80%, rgba(131,165,203,.5), rgba(131,165,203,0) 50%)",
    background: "linear-gradient(180deg, #AFCDE9 1%, #F7FBE7 100%)",
    paperBg: "rgba(0, 0, 0, 0.2)",
    modalBg: "#FAFAFAEF",
    popoverBg: "rgba(255, 255, 255, 0.95)",
    menuBg: "rgba(255, 255, 255, 0.5)",
    backdropBg: "rgba(200, 200, 200, 0.4)",
    largeTextColor: "#759AAE",
    activeLinkColor: "#222222",
    activeLinkSvgColor: "invert(64%) sepia(11%) saturate(934%) hue-rotate(157deg) brightness(90%) contrast(86%)",
    // primaryButtonBG: "#759AAE",
    primaryButtonBG: "#93AEBC",
    primaryButtonHoverBG: "#759AAE",
    // these need fixing
    primaryButtonHoverColor: "#333333",
    secondaryButtonHoverBG: "rgba(54, 56, 64, 1)",
    outlinedPrimaryButtonHoverBG: "#F8CC82",
    outlinedPrimaryButtonHoverColor: "#333333",
    outlinedSecondaryButtonHoverBG: "#FCFCFC",
    outlinedSecondaryButtonHoverColor: "#333333",
    containedSecondaryButtonHoverBG: "#33333333",
};

export const light = responsiveFontSizes(
    createTheme(
        {
            primary: {
                main: lightTheme.color,
            },
            palette: {
                type: "light",
                background: {
                    default: lightTheme.backgroundColor,
                    paper: lightTheme.paperBg,
                },
                //@ts-ignore
                contrastText: lightTheme.color,
                primary: {
                    main: lightTheme.color,
                },
                neutral: {
                    main: lightTheme.color,
                    secondary: lightTheme.gray,
                },
                text: {
                    primary: lightTheme.color,
                    secondary: lightTheme.gray,
                },
            },
            typography: {
                fontFamily: "Square",
            },
            props: {
                MuiSvgIcon: {
                    //@ts-ignore
                    htmlColor: lightTheme.svgColor,
                },
            },
            overrides: {
                MuiCssBaseline: {
                    "@global": {
                        body: {
                            background: lightTheme.background,
                        },
                    },
                },
                MuiPaper: {
                    root: {
                        backgroundColor: lightTheme.paperBg,
                        backdropFilter: "blur(100px)",
                        "&.ohm-card": {
                            backgroundColor: lightTheme.paperBg,
                        },
                        "&.ohm-modal": {
                            backgroundColor: lightTheme.modalBg,
                        },
                        "&.ohm-menu": {
                            backgroundColor: lightTheme.menuBg,
                        },
                        "&.ohm-popover": {
                            backgroundColor: lightTheme.popoverBg,
                            color: lightTheme.color,
                        },
                    },
                },
                MuiDrawer: {
                    paper: {
                        backgroundColor: lightTheme.paperBg,
                    },
                },
                MuiBackdrop: {
                    root: {
                        backgroundColor: lightTheme.backdropBg,
                    },
                },
                MuiLink: {
                    root: {
                        color: lightTheme.color,
                        "&:hover": {
                            color: lightTheme.textHighlightColor,
                            textDecoration: "none",
                            "&.active": {
                                color: lightTheme.color,
                            },
                        },
                        "&.active": {
                            color: lightTheme.color,
                        },
                        "@media (hover:none)": {
                            "&:hover": {
                                color: lightTheme.textHighlightColor,
                                textDecoration: "none",
                                backgroundColor: "#00000000 !important",
                            },
                            "&:focus": {
                                color: lightTheme.textHighlightColor,
                                backgroundColor: "#00000000 !important",
                            },
                        },
                    },
                },
                MuiTableCell: {
                    root: {
                        color: lightTheme.color,
                    },
                },
                MuiInputBase: {
                    root: {
                        color: lightTheme.color,
                    },
                },
                MuiOutlinedInput: {
                    notchedOutline: {
                        borderColor: `${lightTheme.color} !important`,
                        "&:hover": {
                            borderColor: `${lightTheme.color} !important`,
                        },
                    },
                },
                MuiTab: {
                    root: {
                        marginRight: 60,
                    },
                    textColorPrimary: {
                        color: "rgba(255, 255, 255, 0.6)",
                        "&$selected": {
                            color: lightTheme.white,
                        },
                    },
                },
                //@ts-ignore
                PrivateTabIndicator: {
                    colorPrimary: {
                        backgroundColor: lightTheme.color,
                    },
                },
                MuiToggleButton: {
                    root: {
                        backgroundColor: lightTheme.paperBg,
                        "&:hover": {
                            color: lightTheme.color,
                            backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
                        },
                        selected: {
                            backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
                        },
                        "@media (hover:none)": {
                            "&:hover": {
                                color: lightTheme.color,
                                backgroundColor: lightTheme.paperBg,
                            },
                            "&:focus": {
                                color: lightTheme.color,
                                backgroundColor: lightTheme.paperBg,
                            },
                        },
                    },
                },
                MuiIconButton: {
                    root: {
                        "&:hover": {
                            backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
                        },
                        "@media (hover:none)": {
                            "&:hover": {
                                color: lightTheme.color,
                                backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
                            },
                            "&:focus": {
                                color: lightTheme.color,
                                backgroundColor: lightTheme.containedSecondaryButtonHoverBG,
                            },
                        },
                    },
                },
                MuiButton: {
                    containedPrimary: {
                        color: "#FCFCFC",
                        backgroundColor: lightTheme.primaryButtonBG,
                        "&:hover": {
                            backgroundColor: lightTheme.primaryButtonHoverBG,
                            color: lightTheme.primaryButtonHoverColor,
                        },
                        "@media (hover:none)": {
                            color: lightTheme.color,
                            backgroundColor: lightTheme.primaryButtonBG,
                            "&:hover": {
                                backgroundColor: lightTheme.primaryButtonHoverBG,
                            },
                        },
                    },
                    containedSecondary: {
                        color: lightTheme.color,
                        backgroundColor: lightTheme.paperBg,
                        "&:hover": {
                            color: "#FCFCFC",
                            backgroundColor: `${lightTheme.containedSecondaryButtonHoverBG} !important`,
                        },
                        "@media (hover:none)": {
                            color: lightTheme.color,
                            backgroundColor: lightTheme.paperBg,
                            "&:hover": {
                                color: "#FCFCFC",
                                backgroundColor: `${lightTheme.containedSecondaryButtonHoverBG} !important`,
                            },
                        },
                    },
                    outlinedPrimary: {
                        color: lightTheme.primaryButtonBG,
                        borderColor: lightTheme.primaryButtonBG,
                        "&:hover": {
                            color: lightTheme.gold,
                            backgroundColor: lightTheme.primaryButtonHoverBG,
                            borderColor: lightTheme.primaryButtonBG,
                        },
                        "@media (hover:none)": {
                            color: lightTheme.primaryButtonBG,
                            borderColor: lightTheme.primaryButtonBG,
                            "&:hover": {
                                color: `${lightTheme.gold} !important`,
                                backgroundColor: `${lightTheme.primaryButtonBG} !important`,
                            },
                        },
                    },
                    outlinedSecondary: {
                        color: lightTheme.color,
                        borderColor: lightTheme.color,
                        "&:hover": {
                            color: lightTheme.outlinedSecondaryButtonHoverColor,
                            backgroundColor: lightTheme.outlinedSecondaryButtonHoverBG,
                            borderColor: "#333333",
                        },
                    },
                    textPrimary: {
                        color: "#A3A3A3",
                        "&:hover": {
                            color: lightTheme.textHighlightColor,
                            backgroundColor: "#00000000",
                        },
                        "&:active": {
                            color: lightTheme.gold,
                            borderBottom: "#F8CC82",
                        },
                    },
                    textSecondary: {
                        color: lightTheme.color,
                        "&:hover": {
                            color: lightTheme.textHighlightColor,
                        },
                    },
                },
            },
        },
        commonSettings,
    ),
);

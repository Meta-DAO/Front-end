import { ReactComponent as DocsIcon } from "../../../assets/icons/stake.svg";
import { SvgIcon } from "@material-ui/core";

const externalUrls = [
  {
    title: "Docs",
    url: process.env.REACT_APP_DOC_LINK,
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  },
];

export default externalUrls;

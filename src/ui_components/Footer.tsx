import React from "react";
import {Box, SxProps} from "@mui/material";

interface FooterProps {
	sx?: SxProps,
	children?: React.ReactNode,
}

const footerStyle: SxProps = {
	width: "100%",
	bottom: "0px",
	position: "absolute",
	backgroundColor: "#555",
	height: "50px",
	zIndex: 105,
	display: "flex",
	flexDirection: "row",
	justifyContent: "space-evenly"
};

const Footer = (props: FooterProps) => {

	return <Box sx={footerStyle}>
		{props.children}
	</Box>;
};

export default Footer;

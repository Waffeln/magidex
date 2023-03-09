import React from "react";
import {Box, Button} from "@mui/material";
import theme from "../theme";

const Header = () => {

	return <>
		<Box sx={{height: "50px", width: "100%", backgroundColor: theme.palette.primary.main, position: "absolute", display: "flex", justifyContent: "space-around", zIndex: 200}}>
			<Button href={`${process.env.PUBLIC_URL}/#/`}>Home</Button>
			<Button href={`${process.env.PUBLIC_URL}/#/favourite`}>Favourites</Button>
		</Box>
	</>;
};

export default Header;
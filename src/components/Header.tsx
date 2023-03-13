import React from "react";
import {Box, Button} from "@mui/material";
import theme from "../theme";
import MagiDexIcon from "../assets/MagiDexMascot.png";
import config from "../config";

const Header = () => {

	const buttonStyle = {
		fontSize: "1.4em",
	};
	const buttonContainerStyle = {
		display: "flex",
		justifyContent: "space-around",
	};

	return <>
		<Box sx={{
			display: "flex",
			justifyContent: "space-around",
			height: "50px",
			width: "100%",
			backgroundColor: theme.palette.primary.main,
			zIndex: 200,
		}}>
			<Box sx={buttonContainerStyle}>
				<Button sx={buttonStyle} href={config.pathToHome}>Home</Button>
			</Box>
			<Box sx={{display: "flex", alignItems: "center", fontSize: "1.8em", color:"#fff"}}><Box component={"img"} src={MagiDexIcon} sx={{height: "40px"}} /> MagiDex</Box>
			<Box sx={buttonContainerStyle}>
				<Button sx={buttonStyle} href={config.pathToFavourites}>Favourites</Button>
			</Box>
		</Box>
	</>;
};

export default Header;
import React from "react";
import {Box, IconButton} from "@mui/material";
import MagiDexImage from "../assets/MagiDexMascot.png";
import GitHubIcon from "@mui/icons-material/GitHub";
import Footer from "../ui_components/Footer";

const Home = ()=> {

	return (
		<>
			<Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "50px", textAlign: "center"}}>
				<Box component={"h1"}> {"Welcome to MagiDex,"} </Box>
				<Box component={"h2"}> {"click on the Button on the top-left to open the Sidebar, where you can navigate through the app!"} </Box>
				<Box component={"img"} src={MagiDexImage} alt={"MagiDex"}  sx={{width: "30%", bottom:"50px", position: "absolute", alignSelf: "center"}} />
			</Box>
			<Footer>
				<IconButton href={"https://github.com/Waffeln"} target={"_blank"}>
					Waffeln <GitHubIcon />
				</IconButton>
			</Footer>
		</>
	);
};

export default Home;
import React from "react";
import {Box} from "@mui/material";
import DeadMagiDex from "../assets/DeadMagiDex.png";

interface PokeNotFoundProps {
	pokename?: string,
}

const PokeNotFound = (props: PokeNotFoundProps)=> {
	const pokeErrorText = "a pokemon called " + props.pokename + ", try using the Sidebar searchbar.";
	const routeErrorText = "the Page you were looking for, try using the Sidebar for navigation.";

	return (
		<>
			<Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "50px", textAlign: "center"}}>
				<Box component={"h1"}> { (props.pokename !== undefined ? "Pokemon" : "Page") + " not Found"} </Box>
				<Box component={"h2"}> {"I'm sorry, we searched far and wide, but we couldn't find " + (props.pokename !== undefined ? pokeErrorText : routeErrorText) } </Box>
				<Box component={"img"} src={DeadMagiDex} alt={"MagiDex"}  sx={{width: "30%", bottom:"50px", position: "absolute", alignSelf: "center"}} />
			</Box>
		</>
	);
};

export default PokeNotFound;
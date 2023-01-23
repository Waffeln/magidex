import React, {useContext} from "react";
import {Pokemon} from "pokedex-promise-v2";
import {Box, IconButton, Link} from "@mui/material";
import theme from "../theme";
import types from "../assets/typeColor.json";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CropFreeIcon from "@mui/icons-material/CropFree";
import {AppContext} from "../context/AppContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface PokeListItemProps {
	pokemon: Pokemon
}

interface typesJsonType {
	[typeName: string]: string
}

const PokeListItem = (props: PokeListItemProps)=> {
	const appContext = useContext(AppContext);
	const typeJson: typesJsonType = types;
	return (
		<Box sx={{
			height: "105px",
			width: "98%",
			padding: "5px",
			border: "3px solid",
			borderColor: theme.palette.primary.main,
			borderRadius: "10px",
			display: "flex",
		}}>
			<Box component={"img"} sx={{height: "90px", width: "90px"}} src={props.pokemon.sprites.front_default as string} />
			<Box sx={{width: "120px"}}>
				<Box sx={{marginBottom: "10px"}}>{props.pokemon.name.toUpperCase()}</Box>
				{props.pokemon.types.map((el)=> <Box sx={{ color: "#fff", backgroundColor: typeJson[el.type.name],
					width:"60px", textAlign: "center", borderRadius: "8px", marginBottom: "5px" }} key={el.type.name}> {el.type.name.toUpperCase()} </Box>)}
			</Box>
			<Box sx={{ textAlign: "right"}}>
				<IconButton onClick={()=> {
					appContext.favouritePokeNameArray.includes(props.pokemon.name) ?
						appContext.favouritePokeNameArray.splice(appContext.favouritePokeNameArray.indexOf(props.pokemon.name),1)
						: appContext.favouritePokeNameArray.push(props.pokemon.name);
					console.log(appContext.favouritePokeNameArray);
				}
				}>
					{appContext.favouritePokeNameArray.includes(props.pokemon.name) ? <FavoriteIcon sx={{color: "#f77"}} /> : <FavoriteBorderIcon/>}
				</IconButton>
				<IconButton>
					<Link title={"Get more info about " + props.pokemon.name + "!"} href={"/pokedetails/" + props.pokemon.name}>
						<CropFreeIcon />
					</Link>
				</IconButton>
			</Box>

		</Box>
	);
};

export default PokeListItem;
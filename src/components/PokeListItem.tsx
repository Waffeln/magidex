import React, {useContext} from "react";
import {Pokemon} from "pokedex-promise-v2";
import {Box, IconButton, Link} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CropFreeIcon from "@mui/icons-material/CropFree";
import {AppContext} from "../context/AppContext";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface PokeListItemProps {
	pokemon: Pokemon
}

const PokeListItem = (props: PokeListItemProps)=> {
	const appContext = useContext(AppContext);
	return (
		<Box sx={{
			height: "105px",
			width: "280px",
			padding: "5px",
			border: "3px solid",
			borderColor: "#c23",
			borderRadius: "10px",
			display: "flex",
			backgroundColor: "#fff"
		}}>
			<Box component={"img"} sx={{height: "90px", width: "90px"}} src={props.pokemon.sprites.front_default as string} />
			<Box sx={{width: "120px"}}>
				<Box sx={{marginBottom: "10px"}}>{props.pokemon.name.toUpperCase()}</Box>
				{props.pokemon.types.map((el)=> <Box sx={{ color: "#fff", backgroundColor: appContext.typeColorObject[el.type.name],
					width:"80px", textAlign: "center", borderRadius: "8px", marginBottom: "5px" }} key={el.type.name}> {el.type.name.toUpperCase()} </Box>)}
			</Box>
			<Box sx={{ textAlign: "right"}}>
				<IconButton onClick={()=> {
					appContext.favouritePokeNameArray.includes(props.pokemon.name) ?
						appContext.setFavouritePokeNameArray(appContext.favouritePokeNameArray.filter((el: string) => el !== props.pokemon.name))
						: appContext.setFavouritePokeNameArray([...appContext.favouritePokeNameArray, props.pokemon.name]);
					console.log(appContext.favouritePokeNameArray);
				}
				}>
					{appContext.favouritePokeNameArray.includes(props.pokemon.name) ? <FavoriteIcon sx={{color: "#f77"}} /> : <FavoriteBorderIcon/>}
				</IconButton>
				<IconButton>
					<Link title={"Get more info about " + props.pokemon.name + "!"} href={`${process.env.PUBLIC_URL}/#/pokedetails/` + props.pokemon.name}>
						<CropFreeIcon />
					</Link>
				</IconButton>
			</Box>

		</Box>
	);
};

export default PokeListItem;
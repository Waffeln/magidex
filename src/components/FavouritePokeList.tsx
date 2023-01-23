import React, {useContext, useState} from "react";
import {Box, List} from "@mui/material";
import {AppContext} from "../context/AppContext";
import PokeListItem from "./PokeListItem";
import Pokedex, {Pokemon} from "pokedex-promise-v2";

const FavouritePokeList = ()=> {
	const appContext = useContext(AppContext);
	const [favouritePokeArray, setFavouritePokeArray] = useState<Pokemon[]>([]);
	const pokeDex = new Pokedex;
	const promiseArray = appContext.favouritePokeNameArray.map((el: string)=> pokeDex.getPokemonByName(el));
	Promise.all(promiseArray).then((value: Pokemon[]) => setFavouritePokeArray(value));

	return (
		<Box sx={ {
			width: "100%"
		}}>
			<List sx={{margin: "50px", display: "flex", gap: "10px", flexWrap: "wrap", width: "280px"}}>
				{favouritePokeArray.map((el: Pokemon)=><>
					<PokeListItem pokemon={el} />
				</>)}
			</List>
		</Box>
	);
};

export default FavouritePokeList;
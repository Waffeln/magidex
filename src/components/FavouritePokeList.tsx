import React, {useContext, useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import {AppContext} from "../context/AppContext";
import PokeListItem from "./PokeListItem";
import Pokedex, {Pokemon} from "pokedex-promise-v2";

const FavouritePokeList = ()=> {
	const appContext = useContext(AppContext);
	const [favouritePokeArray, setFavouritePokeArray] = useState<Pokemon[]>([]);
	const pokeDex = new Pokedex;

	useEffect(()=> {
		console.log(appContext.favouritePokeNameArray);
		const promiseArray = appContext.favouritePokeNameArray.map((el: string) => pokeDex.getPokemonByName(el));
		Promise.all(promiseArray).then((value: Pokemon[]) => setFavouritePokeArray(value)).catch(
			(error) => appContext.setAlertStatus({type: "error", message: error}));
	}, [appContext.favouritePokeNameArray]);

	return (
		<Box sx={ {
			width: "70%%"
		}}>
			<Grid sx={{margin: "50px", gap: "10px"}} container spacing={1} direction={"row"} >
				{favouritePokeArray.map((el: Pokemon)=><>
					<PokeListItem pokemon={el} key={el.name}/>
				</>)}
			</Grid>
		</Box>
	);
};

export default FavouritePokeList;
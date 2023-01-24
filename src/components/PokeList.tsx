import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../ui_components/Sidebar";
import {AppContext} from "../context/AppContext";
import Pokedex, { Pokemon, PokemonEntry} from "pokedex-promise-v2";
import {Box, Button, List, ListItem, Pagination, TextField} from "@mui/material";
import PokeListItem from "./PokeListItem";
import FilterPokemon from "./FilterPokemon";

const PokeList = ()=> {
	const appContext = useContext(AppContext);
	const pokeDex = new Pokedex;
	const [filteredPokeList, setFilteredPokeList] = useState<Pokemon[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [pokeListPage, setPokeListPage] = useState(1);

	const handleChange = (searchWord: string) => {
		console.log(searchWord);

		getPokemon(searchWord);
	};

	const getPokemon = (searchWord: string) => {
		const promiseArray: Promise<any>[] = [];
		const pokePromiseArray: Promise<Pokemon>[] = [];
		const result: Pokemon[] = [];

		if(appContext.activeFilterArray.length === 0) {
			promiseArray.push(pokeDex.getPokedexByName("national"));
		} else {
			//TODO: add filterPokeByProperties component
		}
		Promise.all(promiseArray).then((value)=> {
			const pokeNames = value[0].pokemon_entries.map((el: PokemonEntry) => el.pokemon_species.name);

			const filteredPokeNames = pokeNames.filter((el: string) => {
				return el.toLowerCase().startsWith(searchWord.toLowerCase());
			});

			filteredPokeNames.slice(0, 40).forEach((el: string)=> {
				pokePromiseArray.push(pokeDex.getPokemonByName(el));
			});

			Promise.all(pokePromiseArray).then((value: Pokemon[]) => {
				value.forEach((el: Pokemon) => {
					result.push(el);
				});
				setFilteredPokeList(result);
			});
		}).catch((error) => appContext.setAlertStatus({type: "error", message: error}));
	};

	useEffect(() => {
		const timeOutId = setTimeout(() => handleChange(searchInput), 500);

		return () => clearTimeout(timeOutId);
	}, [searchInput]);

	return (
		<>
			<Sidebar headerContent={<>
				<Box sx={{position: "absolute", top:"5px", left: "100px", display: "flex", fontSize: "1.2em", gap: "10px"}}>
					<Button href={`${process.env.PUBLIC_URL}/#/`}>Home</Button>
					<Button href={`${process.env.PUBLIC_URL}/#/favourite`}>Favourites</Button>
				</Box>
				<FilterPokemon />
				<TextField id="search-pokemon-text-field" label="Pokemon name..." variant="outlined" sx={{marginLeft: "20px"}} onChange={event => setSearchInput(event.target.value)}/>
			</>}>
				<List sx={{display: "flex", flexDirection: "column"}} >
					{filteredPokeList.slice((pokeListPage - 1)*10, pokeListPage*10).map((el) => (
						<ListItem key={el.name}>
							<PokeListItem pokemon={el} />
						</ListItem>
					))}
				</List>
				<Pagination count={Math.ceil(filteredPokeList.length / 10)} onChange={(event, page) => setPokeListPage(page)} />
			</Sidebar>
		</>
	);
};

export default PokeList;
import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../ui_components/Sidebar";
import {AppContext} from "../context/AppContext";
import PokeDex, {Pokedex ,Pokemon, PokemonEntry} from "pokedex-promise-v2";
import {List, ListItem, Pagination, TextField} from "@mui/material";
import PokeListItem from "./PokeListItem";
import FilterPokemon from "./FilterPokemon";

const PokeList = ()=> {
	const appContext = useContext(AppContext);
	const pokeDex = new PokeDex;
	const [filteredPokeList, setFilteredPokeList] = useState<Pokemon[]>([]);
	const [searchInput, setSearchInput] = useState("");
	const [pokeListPage, setPokeListPage] = useState(1);

	const handleChange = (searchWord: string) => {
		console.log(searchWord);

		getPokemon(searchWord);
	};

	const getPokemon = (searchWord: string) => {
		const promiseArray: Promise<Pokedex>[] = [];
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
				<TextField id="search-pokemon-text-field" label="Pokemon name..." variant="outlined" sx={{
					margin: "0 10px 0 10px",
					width: "190px",
					backgroundColor: "#fff"
				}} onChange={event => setSearchInput(event.target.value)}/>
				<FilterPokemon />
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
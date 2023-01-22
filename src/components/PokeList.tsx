import React, {useContext, useEffect, useState} from "react";
import Sidebar from "../ui_components/Sidebar";
import {AppContext} from "../context/AppContext";
import Pokedex, {PokedexName, Pokemon, PokemonEntry} from "pokedex-promise-v2";
import {List, ListItem, TextField} from "@mui/material";
import PokeListItem from "./PokeListItem";

const PokeList = ()=> {
	const appContext = useContext(AppContext);
	const pokeDex = new Pokedex;
	const [filteredPokeList, setFilteredPokeList] = useState<Pokemon[]>([]);
	const [searchInput, setSearchInput] = useState("");

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

			//TODO: 20 per tab instead of only 20
			filteredPokeNames.slice(0, 20).forEach((el: string)=> {
				pokePromiseArray.push(pokeDex.getPokemonByName(el));
			});

			Promise.all(pokePromiseArray).then((value: Pokemon[]) => {
				value.forEach((el: Pokemon) => {
					result.push(el);
				});
				setFilteredPokeList(result);
			});
		});
	};

	useEffect(() => {
		const timeOutId = setTimeout(() => handleChange(searchInput), 500);

		return () => clearTimeout(timeOutId);
	}, [searchInput]);

	return (
		<>
			<Sidebar headerContent={<>
				<TextField id="search-pokemon-text-field" label="Pokemon name..." variant="outlined" onChange={event => setSearchInput(event.target.value)}/>
			</>}>
				<List sx={{display: "flex", flexDirection: "column"}}>
					{filteredPokeList.map((el) => (
						<ListItem key={el.name}>
							<PokeListItem pokemon={el} />
						</ListItem>
					))}
				</List>
			</Sidebar>
		</>
	);
};

export default PokeList;
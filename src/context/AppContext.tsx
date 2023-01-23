import React, {createContext, useState} from "react";
import {Pokemon} from "pokedex-promise-v2";

interface PokeFilterType {
	[PokeFilterName: string]: string
}

const AppContext = createContext<any>(undefined);

const AppContextProvider: React.FC<any> = ({ children }) => {
	const [activeFilterArray, setActiveFilterArray] = useState<PokeFilterType[]>([]);
	const [favouritePokeNameArray, setFavouritePokeNameArray] = useState<string[]>([]);

	const value={
		activeFilterArray,
		setActiveFilterArray,
		favouritePokeNameArray,
		setFavouritePokeNameArray,
	};

	return (
		<AppContext.Provider value={value} > {children} </AppContext.Provider>
	);
};

export {AppContextProvider, AppContext};
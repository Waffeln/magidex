import React, {createContext, useEffect, useLayoutEffect, useState} from "react";
import typeColor from "../assets/typeColor.json";

interface PokeFilterType {
	[PokeFilterName: string]: string
}

interface TypeColorType {
	[typeName: string]: string
}

const AppContext = createContext<any>(undefined);

const AppContextProvider: React.FC<any> = ({ children }) => {
	const [activeFilterArray, setActiveFilterArray] = useState<PokeFilterType[]>([]);
	const [isInitial, setIsInitial] = useState(true);
	const [favouritePokeNameArray, setFavouritePokeNameArray] = useState<string[]>(
		localStorage.favouritePokeNameArray !== undefined &&
		typeof (JSON.parse(localStorage.favouritePokeNameArray)[0]) === "string" ?
			JSON.parse(localStorage.favouritePokeNameArray) : []
	);
	const typeColorObject: TypeColorType = typeColor;

	useEffect(()=> {
		if(isInitial) {
			setIsInitial(false);
			return;
		}
		localStorage.setItem("favouritePokeNameArray", JSON.stringify(favouritePokeNameArray));
	}, [favouritePokeNameArray]);

	const value={
		activeFilterArray,
		setActiveFilterArray,
		favouritePokeNameArray,
		setFavouritePokeNameArray,
		typeColorObject
	};

	return (
		<AppContext.Provider value={value} > {children} </AppContext.Provider>
	);
};

export {AppContextProvider, AppContext};
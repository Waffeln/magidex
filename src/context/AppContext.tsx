import React, {createContext, useState} from "react";

const AppContext = createContext<any>(undefined);

const AppContextProvider: React.FC<any> = ({ children }) => {
	const [pokeNameList, setPokeNameList] = useState<string[]>([]);

	const value={
		pokeNameList,
		setPokeNameList
	};

	return (
		<AppContext.Provider value={value} > {children} </AppContext.Provider>
	);
};

export {AppContextProvider, AppContext};
import React, {createContext, useState} from "react";

interface PokeFilterType {
	[PokeFilterName: string]: string
}

const AppContext = createContext<any>(undefined);

const AppContextProvider: React.FC<any> = ({ children }) => {
	const [activeFilterArray, setActiveFilterArray] = useState<PokeFilterType[]>([]);

	const value={
		activeFilterArray,
		setActiveFilterArray
	};

	return (
		<AppContext.Provider value={value} > {children} </AppContext.Provider>
	);
};

export {AppContextProvider, AppContext};
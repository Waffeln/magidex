import React, {createContext, useEffect, useState} from "react";
import typeColor from "../assets/typeColor.json";

interface PokeFilterType {
	[PokeFilterName: string]: string
}

interface ContextProps {
	children: React.ReactNode;
}

interface AlertStatusType {
	type: string,
	message: string
}

interface TypeColorType {
	[typeName: string]: string
}

// eslint-disable-next-line
const AppContext = createContext({} as any);

const AppContextProvider: React.FC<ContextProps> = ({ children }) => {
	const [activeFilterArray, setActiveFilterArray] = useState<PokeFilterType[]>([]);
	const [isInitial, setIsInitial] = useState(true);
	const [alertStatus, setAlertStatus] = useState<AlertStatusType>({message: "", type: ""});
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

	const value = {
		activeFilterArray,
		setActiveFilterArray,
		favouritePokeNameArray,
		setFavouritePokeNameArray,
		typeColorObject,
		alertStatus,
		setAlertStatus
	};

	return (
		<AppContext.Provider value={value} > {children} </AppContext.Provider>
	);
};

export {AppContextProvider, AppContext};
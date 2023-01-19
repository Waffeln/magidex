import React, {useContext, useEffect} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeList from "./components/PokeList";
import FavouritePokeList from "./components/FavouritePokeList";
import { createTheme, ThemeProvider} from "@mui/material";
import theme from "./theme";
import { AppContextProvider} from "./context/AppContext";
import PokeDetails from "./components/PokeDetails";

function App() {
	const appTheme = createTheme(theme);

	return (
		<>
			<AppContextProvider>
				<ThemeProvider theme={appTheme}>
					<PokeList />
					<BrowserRouter>
						<Routes>
							<Route path={"/"} element={<div>
								filler
							</div>}/>
							<Route path={"/pokedetails"} element={<PokeDetails />} />
							<Route path={"/favourite"} element={<FavouritePokeList />}/>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</AppContextProvider>
		</>
	);
}

export default App;

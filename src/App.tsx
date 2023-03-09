import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import PokeList from "./components/PokeList";
import FavouritePokeList from "./components/FavouritePokeList";
import { createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";
import { AppContextProvider} from "./context/AppContext";
import PokeDetails from "./components/PokeDetails";
import PokeNotFound from "./components/PokeNotFound";
import Home from "./components/Home";
import AlertHandler from "./components/AlertHandler";
import Header from "./components/Header";

function App() {
	const appTheme = createTheme(theme);

	return (
		<>
			<AppContextProvider>
				<ThemeProvider theme={appTheme}>
					<CssBaseline />
					<HashRouter>
						<AlertHandler />
						<Header />
						<PokeList />
						<Routes>
							<Route path={"/"} element={<Home />} />
							<Route path={"/pokedetails"} element={<PokeNotFound />} />
							<Route path={"/pokedetails/:pokename"} element={<PokeDetails />} />
							<Route path={"/favourite"} element={<FavouritePokeList />}/>
							<Route path={"*"} element={<PokeNotFound />} />
						</Routes>
					</HashRouter>
				</ThemeProvider>
			</AppContextProvider>
		</>
	);
}

export default App;

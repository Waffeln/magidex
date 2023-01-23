import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeList from "./components/PokeList";
import FavouritePokeList from "./components/FavouritePokeList";
import { createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./theme";
import { AppContextProvider} from "./context/AppContext";
import PokeDetails from "./components/PokeDetails";
import PokeNotFound from "./components/PokeNotFound";
import Home from "./components/Home";

function App() {
	const appTheme = createTheme(theme);

	return (
		<>
			<AppContextProvider>
				<ThemeProvider theme={appTheme}>
					<CssBaseline />
					<BrowserRouter>
						<PokeList />
						<Routes>
							<Route path={"/"} element={<Home />} />
							<Route path={"/pokedetails"} element={<PokeNotFound />} />
							<Route path={"/pokedetails/:pokename"} element={<PokeDetails />} />
							<Route path={"/favourite"} element={<FavouritePokeList />}/>
							<Route path={"*"} element={<PokeNotFound />} />
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</AppContextProvider>
		</>
	);
}

export default App;

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeList from "./components/PokeList";
import FavouritePokeList from "./components/FavouritePokeList";
import { createTheme, ThemeProvider } from "@mui/material";
import theme from "./theme";

function App() {
	const appTheme = createTheme(theme);
	return (
		<ThemeProvider theme={appTheme}>
			<BrowserRouter>
				<Routes>
					<Route path={"/"} element={<div>
						filler
					</div>}/>
					<Route path={"/pokelist"} element={<PokeList />} />
					<Route path={"/favourite"} element={<FavouritePokeList />}/>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;

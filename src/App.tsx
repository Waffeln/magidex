import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokeList from "./components/PokeList";
import FavouritePokeList from "./components/FavouritePokeList";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path={"/"} element={<div>
						filler
					</div>}/>
					<Route path={"/pokelist"} element={<PokeList />} />
					<Route path={"/favourite"} element={<FavouritePokeList />}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

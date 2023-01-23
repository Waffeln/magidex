import React, {useContext, useState} from "react";
import {Grid, IconButton, Popover} from "@mui/material";
import {Tune} from "@mui/icons-material";
import {AppContext} from "../context/AppContext";

const gridItemStyle = {
	color: "#fff",
	width:"90px",
	textAlign: "center",
	borderRadius: "8px",
	marginBottom: "5px",
	"&:hover": {
		opacity: 0.8,
		backgroundColor: "#456"
	}
};

const FilterPokemon = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);
	const appContext = useContext(AppContext);

	return (
		<>
			<IconButton onClick={(event) => setAnchorEl(anchorEl === null ? event.currentTarget : null)}>
				<Tune />
			</IconButton>

			<Popover
				sx={{
					pointerEvents: "none",
				}}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				onClose={()=> setAnchorEl(null)}
				disableRestoreFocus
			>
				Filter by: (WIP)
				<Grid sx={{
					width: "360px"
				}}>
					{Object.keys(appContext.typeColorObject).map((el: string)=> <IconButton key={el} sx={{...gridItemStyle, backgroundColor: appContext.typeColorObject[el]}}>
						{el}
					</IconButton>)}
				</Grid>
			</Popover>
		</>
	);
};

export default FilterPokemon;
import React, {useState} from "react";
import {Grid, IconButton, Popover} from "@mui/material";
import {Tune} from "@mui/icons-material";
import typeColor from "../assets/typeColor.json";

interface typesJsonType {
	[typeName: string]: string
}

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
	const typeColorObject: typesJsonType = typeColor;

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
				<Grid sx={{
					width: "360px"
				}}>
					{Object.keys(typeColor).map((el: string)=> <IconButton key={el} sx={{...gridItemStyle, backgroundColor: typeColorObject[el]}}>
						{el}
					</IconButton>)}
				</Grid>
			</Popover>
		</>
	);
};

export default FilterPokemon;
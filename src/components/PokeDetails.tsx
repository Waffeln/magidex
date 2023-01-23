import React, {useContext, useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import {Box, Button, Grid, Paper, SxProps} from "@mui/material";
import PokeNotFound from "./PokeNotFound";
import Pokedex, {EvolutionChain, Pokemon} from "pokedex-promise-v2";
import {AppContext} from "../context/AppContext";

interface PresentationStateType {
	isShiny: boolean,
	isFront: boolean,
	isBoy: boolean,
	gameVersion: string,
}

const paperStyle: SxProps = {
	height:"100%",
	width: "80%",
	margin: "50px",
	display: "flex",
	border: "3px solid",
	padding: "20px",
	flexDirection: "column",
	backgroundColor: "#ececec"
};

const imageStyle: SxProps = {
	height: "150px", width: "150px"
};

const buttonStyle: SxProps = {
	color: "#fff",
	width:"60px",
	textAlign: "center",
	borderRadius: "8px",
	marginBottom: "5px",
	backgroundColor: "primary",
	"&:hover": {
		backgroundColor: "secondary"
	}
};

const PokeDetails = ()=> {
	const [focusedPokemen, setFocusedPokemon] = useState<Pokemon>();
	const [evolutionChain, setEvolutionChain] = useState<EvolutionChain>();
	const [presentationState, setPresentationsState] = useState<PresentationStateType>({
		isShiny: false,
		isFront: true,
		gameVersion: "latest",
		isBoy: true
	});
	const pokeDex = new Pokedex;
	const params = useParams();
	const appContext = useContext(AppContext);

	useEffect(()=> {
		if(params.pokename !== undefined) {
			Promise.all([pokeDex.getPokemonByName(params.pokename)]).then((value: Pokemon[]) => setFocusedPokemon(value[0]));
		}
	}, []);

	useEffect(()=>{
		if(focusedPokemen === undefined) return;
		Promise.all([pokeDex.getEvolutionChainById(focusedPokemen.id)]).then((value: EvolutionChain[]) => {
			setEvolutionChain(value[0]);
			console.log(value[0]);
			console.log(focusedPokemen);
		});
	}, [focusedPokemen]);

	return (
		<>
			{params.pokename && focusedPokemen ? <Paper
				sx={paperStyle}>
				<Box component={"h1"} sx={{top: "10px", position: "relative" ,textAlign: "center"}}>{focusedPokemen.name.toUpperCase()}</Box>
				<Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
					<Box component={"img"}src={(focusedPokemen?.sprites as any)[(presentationState.isFront ? "front" : "back") + "_"
					+ (presentationState.isShiny ? "shiny" : "default")] as string} sx={imageStyle} />
					<Box>
						{focusedPokemen.types.map((el)=> <Box sx={{ color: "#fff", backgroundColor: appContext.typeColorObject[el.type.name],
							width:"80px", textAlign: "center", borderRadius: "8px", marginBottom: "5px" }} key={el.type.name}> {el.type.name.toUpperCase()} </Box>)}
					</Box>
					<Box>
						Change Sprite view:
						<br />
						<Button onClick={()=> setPresentationsState({...presentationState, isShiny: !presentationState.isShiny})
						} sx={buttonStyle}> {!presentationState.isShiny ? "SHINY" : "DEFAULT"} </Button>
						<Button onClick={()=> setPresentationsState({...presentationState, isFront: !presentationState.isFront})
						} sx={buttonStyle}> {!presentationState.isFront ? "FRONT" : "BACK"} </Button>
					</Box>
				</Box>
				<Box sx={{width: "320px"}}>
					Stats:
					<Grid container spacing={1} direction={"column"}>
						{focusedPokemen.stats.map((el, idx)=>(
							<Grid key={el.stat.name} item xs={3} sx={{
								display: "flex",
								justifyContent: "space-between",
								height: "50px",
							}}>
								<Box sx={{backgroundColor: idx % 2===1 ? "#d5d5d5" : "#b5b5b5", width: "100%"}}>{el.stat.name.replace("-", " ").toUpperCase()}:</Box>
								<Box sx={{backgroundColor: idx % 2===1 ? "#d5d5d5" : "#b5b5b5"}}>{el.base_stat} </Box>
							</Grid>))}
					</Grid>
				</Box>
			</Paper> : <PokeNotFound />}
		</>
	);
};

export default PokeDetails;
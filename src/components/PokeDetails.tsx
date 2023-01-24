import React, {useContext, useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import {Box, Button, Grid, Paper, SxProps, TextField} from "@mui/material";
import PokeNotFound from "./PokeNotFound";
import Pokedex, {EvolutionChain, Pokemon} from "pokedex-promise-v2";
import {AppContext} from "../context/AppContext";
import {DataGrid} from "@mui/x-data-grid";

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
			Promise.all([pokeDex.getPokemonByName(params.pokename)]).then((value: Pokemon[]) => setFocusedPokemon(value[0])).catch(
				(error) => appContext.setAlertStatus({type: "error", message: error}));
		}
	}, []);

	useEffect(()=>{
		if(focusedPokemen === undefined) return;
		Promise.all([pokeDex.getEvolutionChainById(focusedPokemen.id)]).then((value: EvolutionChain[]) => {
			setEvolutionChain(value[0]);
			console.log(value[0]);
			console.log(focusedPokemen);
		}).catch((error) => appContext.setAlertStatus({type: "error", message: error}));
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
				<Box sx={{display: "flex", justifyContent: "space-between"}}>
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
					<Box sx={{width: "320px"}}>
						Abilities:
						{focusedPokemen.abilities.map((el, idx)=> (
							<Box key={el.ability.name} sx={{backgroundColor: idx % 2===1 ? "#d5d5d5" : "#b5b5b5", width: "100%"}}>
								{el.ability.name}
							</Box>
						))}
					</Box>
				</Box>
				<Box sx={{ height: "800px", width: "100%"}}>
					Moves:

					<DataGrid rows={focusedPokemen.moves.map((el, idx)=> {
						return {
							id: idx+1,
							moveName: el.move.name,
							learnedBy: el.version_group_details[el.version_group_details.length - 1].move_learn_method.name,
							versions: (()=> {
								let resultName = "";
								el.version_group_details.forEach((el2, idx) => {
									resultName += el2.version_group.name;
									if(idx < el.version_group_details.length-1) resultName+= ", ";
								});
								return resultName;
							})()
						};
					})} columns={
						[
							{
								field: "id", headerName: "ID", width: 70
							},
							{
								field: "moveName", headerName: "Move", width: 150
							},
							{
								field: "learnedBy", headerName: "Learned by", width: 150
							},
							{
								field: "versions", headerName: "Versions", width: 1000, renderCell: (cellValues) => {
									return (
										<TextField
											sx={{width: 1000, border: "none"}}
											variant={"standard"}
											value={cellValues.row.versions}
											InputProps={{ disableUnderline: true, readOnly: true }}
											multiline
										/>
									);
								}
							}
						]} pageSize={20} rowsPerPageOptions={[20]} rowHeight={100} />)
				</Box>
			</Paper> :  <PokeNotFound pokename={params.pokename} />}
		</>
	);
};

export default PokeDetails;
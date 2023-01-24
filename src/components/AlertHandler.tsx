import Alert from "@mui/material/Alert";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../context/AppContext";
import {Collapse, IconButton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertHandler = () => {
	const appContext = useContext(AppContext);
	const [open, setOpen] = useState(false);
	useEffect(()=> {
		console.log(appContext.alertStatus.message);
		if (appContext.alertStatus.type !== "") setOpen(true);
	}, [appContext.alertStatus]);
	return <Collapse in={open} sx={{display: "flex", justifyContent: "center"}}>
		{open &&
			<Alert severity="error" sx={{zIndex: 300, position: "absolute", marginTop: "10px"}}>
				{appContext.alertStatus.message}
				<IconButton
					aria-label="close"
					color="inherit"
					size="small"
					onClick={() => {
						setOpen(false);
					}}
				>
					<CloseIcon fontSize="inherit" />
				</IconButton>
			</Alert>}
	</Collapse>;
};

export default AlertHandler;
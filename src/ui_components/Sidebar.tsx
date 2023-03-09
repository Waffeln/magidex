import React, {useState} from "react";
import {Box, Drawer, IconButton, SxProps} from "@mui/material";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

interface SidebarProps {
	sx?: SxProps,
	children?: React.ReactNode,
	headerContent?: ReactJSXElement,
}

const Sidebar = (props: SidebarProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const drawerStyle = {
		height: "100%",
		width: "350px",
		zIndex: 300,
		...props.sx
	};

	const handleDrawerOpen = () => setIsOpen(!isOpen);

	return (
		<>
			<IconButton
				onClick={handleDrawerOpen}
				sx={{
					top:"0px",
					zIndex: 310,
					position: "absolute",
					padding: "20px",
					height: "50px",
					width: "50px",
					borderRadius: 0,
					color: "#fff",
					"&:hover": {
						backgroundColor: "#acacac"
					}
				}}
			>
				{isOpen ? <ArrowBackIosNewIcon/> : <ArrowForwardIosIcon/>}
			</IconButton>
			<Drawer sx={drawerStyle} open={isOpen} PaperProps={{sx: {zIndex: 300}}} variant={"persistent"}>
				<Box sx={{
					paddingTop: "65px",
					paddingLeft: "10px",
					minHeight: "140px",
					backgroundColor: "#ddd",
				}}>
					{props.headerContent}
				</Box>
				<Box sx={{paddingLeft: "10px"}}>
					{props.children}
				</Box>
			</Drawer>
		</>);
};

export default Sidebar;
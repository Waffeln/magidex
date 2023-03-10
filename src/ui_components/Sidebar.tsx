import React, {useState} from "react";
import {Box, Drawer, IconButton, SxProps} from "@mui/material";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import theme from "../theme";

interface SidebarProps {
	sx?: SxProps,
	children?: React.ReactNode,
	headerContent?: ReactJSXElement,
}

const Sidebar = (props: SidebarProps) => {
	const [isOpen, setIsOpen] = useState(true);
	const drawerStyle = {
		height: "100%",
		width: "320px",
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
					color: isOpen ? "#555" : "#fff",
				}}
			>
				{isOpen ? <ArrowBackIosNewIcon/> : <ArrowForwardIosIcon/>}
			</IconButton>
			<Drawer sx={drawerStyle} open={isOpen} PaperProps={{
				className: "paperStyle",
				sx: {zIndex: 300, backgroundColor: theme.palette.primary.main, maxWidth: "320px"}
			}} variant={"persistent"}>
				<Box sx={{
					paddingTop: "10px",
					paddingLeft: "50px",
					minHeight: "80px",
					backgroundColor: "rgba(200, 200, 200, 0.7)"
				}}>
					{props.headerContent}
				</Box>
				<Box>
					{props.children}
				</Box>
			</Drawer>
		</>);
};

export default Sidebar;
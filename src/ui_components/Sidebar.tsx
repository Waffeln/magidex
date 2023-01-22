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
	const [isOpen, setIsOpen] = useState(false);
	const drawerStyle = {
		height: "100%",
		width: "350px",
		zIndex: 105,
		...props.sx
	};

	const handleDrawerOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<IconButton
				onClick={handleDrawerOpen}
				sx={{
					padding: "20px",
					height: "50px",
					width: "50px",
					zIndex: 110,
					backgroundColor: "#ddd",
					borderRadius: 0,
				}}
			>
				{isOpen ? <ArrowBackIosNewIcon/> : <ArrowForwardIosIcon/>}
			</IconButton>
			<Drawer sx={drawerStyle} open={isOpen} PaperProps={{
				sx: {
					width: drawerStyle.width
				}
			}}>
				<Box sx={{
					paddingTop: "65px",
					paddingLeft: "10px",
					minHeight: "15%",
					backgroundColor: "#ddd"
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
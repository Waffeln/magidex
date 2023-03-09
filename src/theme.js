const theme = {
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					backgroundColor: "#ff8200",
					color: "#fff",
					"&:hover": {
						backgroundColor: "rgba(119, 119, 119, 0.6)"
					},
				}
			}
		},
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundColor: "rgba(255,153,19, 0.35)",
				}
			}
		}
	},
	palette: {
		primary: {
			main: "#ff8200"
		},
		secondary: {
			main: "#27445C",
			light: "#acacac",
			dark: "#27445C"
		}
	}
};

export default theme;
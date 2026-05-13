import Box from "@mui/material/Box";
import Header from "./components/Header";
import ItemList from "./pages/ItemList";

function App() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(45deg, #fdb8c4, #b3c6fd)",
            }}
        >
            <Header />
            <ItemList />
        </Box>
    );
}

export default App;

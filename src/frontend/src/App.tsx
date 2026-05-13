import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import ItemList from "./pages/ItemList";
import ItemDetail from "./pages/ItemDetail";

function App() {
    return (
        <BrowserRouter>
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(45deg, #fdb8c4, #b3c6fd)",
                }}
            >
                <Header />
                <Routes>
                    <Route path="/" element={<ItemList />} />
                    <Route path="/item/:id" element={<ItemDetail />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;

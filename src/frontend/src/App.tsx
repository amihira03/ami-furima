import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import ItemList from "./pages/ItemList";
import ItemDetail from "./pages/ItemDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyPage from "./pages/MyPage";

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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/mypage" element={<MyPage />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
}

export default App;

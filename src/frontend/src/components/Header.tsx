import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthPage =
        location.pathname === "/login" || location.pathname === "/register";

    // localStorageにtokenがあればログイン済みと判断
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
            }}
        >
            <Toolbar sx={{ gap: 2 }}>
                <Typography
                    variant="h6"
                    onClick={() => navigate("/")}
                    sx={{
                        fontWeight: "bold",
                        color: "white",
                        letterSpacing: "0.05em",
                        flexShrink: 0,
                        cursor: "pointer",
                    }}
                >
                    FURIMA
                </Typography>

                {!isAuthPage && (
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "center",
                            background: "rgba(255, 255, 255, 0.3)",
                            borderRadius: "20px",
                            px: 2,
                            py: 0.5,
                        }}
                    >
                        <SearchIcon sx={{ color: "white", mr: 1 }} />
                        <InputBase
                            placeholder="なにをお探しですか？"
                            sx={{
                                color: "white",
                                width: "100%",
                                "& ::placeholder": {
                                    color: "rgba(255,255,255,0.7)",
                                },
                            }}
                        />
                    </Box>
                )}

                {!isAuthPage && (
                    <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                        {isLoggedIn ? (
                            // ログイン済みの場合
                            <>
                                <Button
                                    variant="text"
                                    onClick={() => navigate("/mypage")}
                                    sx={{ color: "white" }}
                                >
                                    マイページ
                                </Button>
                                <Button
                                    variant="text"
                                    onClick={handleLogout}
                                    sx={{ color: "white" }}
                                >
                                    ログアウト
                                </Button>
                            </>
                        ) : (
                            // 未ログインの場合
                            <Button
                                variant="text"
                                onClick={() => navigate("/login")}
                                sx={{ color: "white" }}
                            >
                                ログイン
                            </Button>
                        )}
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/sell")}
                            sx={{
                                color: "white",
                                borderColor: "white",
                                borderRadius: "20px",
                                "&:hover": {
                                    background: "rgba(255,255,255,0.2)",
                                    borderColor: "white",
                                },
                            }}
                        >
                            出品
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;

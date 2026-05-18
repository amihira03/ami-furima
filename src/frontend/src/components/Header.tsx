import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const location = useLocation();
    // ログイン・会員登録ページかどうかを判定
    const isAuthPage =
        location.pathname === "/login" || location.pathname === "/register";

    return (
        // AppBar = 画面上部に固定されるヘッダーバー
        <AppBar
            position="sticky" // スクロールしても上部に張り付く（fixedだと他の要素に被る）
            elevation={0} // 影をなくす（すっきりした見た目に）
            sx={{
                background: "rgba(255, 255, 255, 0.2)", // 白の半透明（すりガラス）
                backdropFilter: "blur(10px)", // 背景をぼかす
                WebkitBackdropFilter: "blur(10px)", // Safari用
                borderBottom: "1px solid rgba(255, 255, 255, 0.3)", // 下ボーダー
            }}
        >
            {/* Toolbar = ヘッダーの中身を横並びにするコンテナ */}
            <Toolbar sx={{ gap: 2 }}>
                {" "}
                {/* gap = 子要素間の隙間（2 = 16px） */}
                {/* ロゴ */}
                <Typography
                    variant="h6"
                    onClick={() => navigate("/")}
                    sx={{
                        fontWeight: "bold",
                        color: "white",
                        letterSpacing: "0.05em",
                        flexShrink: 0, // 画面が狭くなっても縮まないようにする
                        cursor: "pointer", // クリックできることを示す
                    }}
                >
                    FURIMA
                </Typography>
                {/* 検索バー（ログイン・会員登録ページでは非表示） */}
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
                {/* 右側のボタン群（ログイン・会員登録ページでは非表示） */}
                {!isAuthPage && (
                    <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                        <Button
                            variant="text"
                            onClick={() => navigate("/login")}
                            sx={{ color: "white" }}
                        >
                            ログイン
                        </Button>
                        <Button
                            variant="text"
                            onClick={() => navigate("/mypage")}
                            sx={{ color: "white" }}
                        >
                            マイページ
                        </Button>
                        <Button
                            variant="outlined"
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

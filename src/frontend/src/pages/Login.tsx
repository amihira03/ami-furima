import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    return (
        // 画面全体を中央寄せにする箱
        <Box
            sx={{
                display: "flex", // 子要素を並べる
                justifyContent: "center", // 横方向：中央
                alignItems: "center", // 縦方向：中央
                minHeight: "80vh", // 画面の高さの80%
            }}
        >
            <Container maxWidth="sm">
                {" "}
                {/* sm = 小さめの幅に制限 */}
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    ログイン
                </Typography>
                <Box
                    sx={{
                        background: "rgba(255,255,255,0.25)", // すりガラスの色
                        backdropFilter: "blur(10px)", // ぼかし
                        WebkitBackdropFilter: "blur(10px)", // Safari用
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "20px",
                        p: 4, // 内側のpadding
                    }}
                >
                    {/* メールアドレス */}
                    <TextField
                        label="メールアドレス"
                        type="email"
                        fullWidth
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "rgba(255,255,255,0.5)", // フォーカス時のボーダー色
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#5a5a5a", // フォーカス時のラベル色
                            },
                        }}
                    />
                    {/* パスワード */}
                    <TextField
                        label="パスワード"
                        type="password" // 入力文字を●で隠す
                        fullWidth
                        sx={{
                            mb: 4,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "rgba(255,255,255,0.5)", // フォーカス時のボーダー色
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#5a5a5a", // フォーカス時のラベル色
                            },
                        }}
                    />
                    {/* ログインボタン */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            width: "50%", // 幅を50%に
                            display: "block", // 中央寄せのために必要
                            margin: "0 auto", // 中央寄せ
                            py: 1.5,
                            borderRadius: "20px",
                            background:
                                "linear-gradient(45deg, #fdb8c4, #b3c6fd)",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            boxShadow: "none",
                            "&:hover": {
                                background:
                                    "linear-gradient(45deg, #f9a0b0, #9db5f9)",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            },
                        }}
                    >
                        ログインする
                    </Button>
                    {/* 会員登録リンク */}
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Typography
                            onClick={() => navigate("/register")}
                            sx={{
                                color: "#5a5a5a",
                                fontSize: "0.9rem",
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            会員登録はこちら
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;

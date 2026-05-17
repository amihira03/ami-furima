import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    会員登録
                </Typography>
                <Box
                    sx={{
                        background: "rgba(255,255,255,0.25)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "20px",
                        p: 4,
                    }}
                >
                    {/* ユーザー名 */}
                    <TextField
                        label="ユーザー名"
                        type="text"
                        fullWidth
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "rgba(255,255,255,0.5)",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#5a5a5a",
                            },
                        }}
                    />
                    {/* メールアドレス */}
                    <TextField
                        label="メールアドレス"
                        type="email"
                        fullWidth
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "rgba(255,255,255,0.5)",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#5a5a5a",
                            },
                        }}
                    />
                    {/* パスワード */}
                    <TextField
                        label="パスワード"
                        type="password"
                        fullWidth
                        sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "rgba(255,255,255,0.5)",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#5a5a5a",
                            },
                        }}
                    />
                    {/* 確認用パスワード */}
                    <TextField
                        label="確認用パスワード"
                        type="password"
                        fullWidth
                        sx={{
                            mb: 4,
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "rgba(255,255,255,0.5)",
                                },
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#5a5a5a",
                            },
                        }}
                    />
                    {/* 登録するボタン */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            width: "50%",
                            display: "block",
                            margin: "0 auto",
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
                        登録する
                    </Button>
                    {/* ログインリンク */}
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Typography
                            onClick={() => navigate("/login")}
                            sx={{
                                color: "#5a5a5a",
                                fontSize: "0.9rem",
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            ログインはこちら
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../lib/axios";
import { extractValidationErrors } from "../utils/handleApiError";
import type { ValidationErrors } from "../types/error";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {},
    );

    const handleSubmit = async () => {
        setError("");
        setValidationErrors({});
        try {
            const response = await axiosInstance.post("/login", {
                email,
                password,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (err) {
            const errors = extractValidationErrors(err);
            if (Object.keys(errors).length > 0) {
                // 422: バリデーションエラー（未入力・形式不正など）
                setValidationErrors(errors);
            } else if (
                axios.isAxiosError(err) &&
                err.response?.status === 401
            ) {
                // 401: メール/パスワードの組み合わせが正しくない
                setError("メールアドレスまたはパスワードが正しくありません");
            } else {
                setError("エラーが発生しました。もう一度お試しください");
            }
        }
    };

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
                    ログイン
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
                    {/* エラーメッセージ（401など、フィールドに紐付かないもの） */}
                    {error && (
                        <Typography
                            sx={{
                                color: "error.main",
                                mb: 2,
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                    <TextField
                        label="メールアドレス"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!validationErrors.email}
                        helperText={validationErrors.email?.[0]}
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
                    <TextField
                        label="パスワード"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!validationErrors.password}
                        helperText={validationErrors.password?.[0]}
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
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
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
                        ログインする
                    </Button>
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Typography
                            onClick={() => navigate("/register")}
                            sx={{
                                color: "#5a5a5a",
                                fontSize: "0.9rem",
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
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

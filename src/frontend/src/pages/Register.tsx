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

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {},
    );

    const handleSubmit = async () => {
        setError("");
        setValidationErrors({});
        try {
            const response = await axiosInstance.post("/register", {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            localStorage.setItem("token", response.data.token);
            navigate("/");
        } catch (err) {
            const errors = extractValidationErrors(err);
            if (Object.keys(errors).length > 0) {
                // 422: バリデーションエラー（未入力・形式不正・パスワード不一致など）
                setValidationErrors(errors);
            } else if (axios.isAxiosError(err)) {
                setError("登録に失敗しました");
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
                    {error && (
                        <Typography
                            sx={{ color: "red", mb: 2, textAlign: "center" }}
                        >
                            {error}
                        </Typography>
                    )}
                    <TextField
                        label="ユーザー名"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!validationErrors.name}
                        helperText={validationErrors.name?.[0]}
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
                        label="確認用パスワード"
                        type="password"
                        fullWidth
                        value={passwordConfirmation}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                        error={!!validationErrors.password_confirmation}
                        helperText={validationErrors.password_confirmation?.[0]}
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
                        登録する
                    </Button>
                    <Box sx={{ textAlign: "center", mt: 2 }}>
                        <Typography
                            onClick={() => navigate("/login")}
                            sx={{
                                color: "#5a5a5a",
                                fontSize: "0.9rem",
                                cursor: "pointer",
                                "&:hover": { textDecoration: "underline" },
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

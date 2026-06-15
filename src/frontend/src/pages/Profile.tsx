import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../lib/axios";
import { extractValidationErrors } from "../utils/handleApiError";
import type { ValidationErrors } from "../types/error";

type User = {
    id: number;
    name: string;
    postal_code: string | null;
    address: string | null;
    building: string | null;
    profile_image_path: string | null;
};

const Profile = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [building, setBuilding] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [currentImagePath, setCurrentImagePath] = useState<string | null>(
        null,
    );
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {},
    );

    useEffect(() => {
        axiosInstance.get<User>("/user").then((response) => {
            const user = response.data;
            setName(user.name);
            setPostalCode(user.postal_code ?? "");
            setAddress(user.address ?? "");
            setBuilding(user.building ?? "");
            setCurrentImagePath(user.profile_image_path);
        });
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        setError("");
        setValidationErrors({});

        const formData = new FormData();
        formData.append("name", name);
        formData.append("postal_code", postalCode);
        formData.append("address", address);
        formData.append("building", building);
        if (image) {
            formData.append("profile_image", image);
        }

        try {
            await axiosInstance.post("/profile", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            navigate("/mypage");
        } catch (err) {
            const errors = extractValidationErrors(err);
            if (Object.keys(errors).length > 0) {
                setValidationErrors(errors);
            } else if (axios.isAxiosError(err)) {
                setError("プロフィールの更新に失敗しました");
            } else {
                setError("エラーが発生しました。もう一度お試しください");
            }
        }
    };

    const avatarSrc = image
        ? URL.createObjectURL(image)
        : currentImagePath
          ? `http://localhost/storage/${currentImagePath}`
          : undefined;

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
                    プロフィール設定
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
                            sx={{
                                color: "error.main",
                                mb: 2,
                                textAlign: "center",
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                    {/* アイコン画像エリア */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            mb: validationErrors.profile_image ? 1 : 4,
                        }}
                    >
                        <Avatar
                            src={avatarSrc}
                            sx={{ width: 70, height: 70 }}
                        />
                        <Button
                            variant="outlined"
                            component="label"
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
                            画像を選択する
                            <input
                                type="file"
                                hidden
                                accept=".png,.jpg,.jpeg"
                                onChange={handleImageChange}
                            />
                        </Button>
                    </Box>
                    {validationErrors.profile_image && (
                        <Typography
                            sx={{
                                color: "error.main",
                                fontSize: "0.8rem",
                                mb: 4,
                            }}
                        >
                            {validationErrors.profile_image[0]}
                        </Typography>
                    )}

                    {/* ユーザー名 */}
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

                    {/* 郵便番号 */}
                    <TextField
                        label="郵便番号"
                        placeholder="例：123-4567"
                        type="text"
                        fullWidth
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        error={!!validationErrors.postal_code}
                        helperText={validationErrors.postal_code?.[0]}
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

                    {/* 住所 */}
                    <TextField
                        label="住所"
                        type="text"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        error={!!validationErrors.address}
                        helperText={validationErrors.address?.[0]}
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

                    {/* 建物名 */}
                    <TextField
                        label="建物名"
                        type="text"
                        fullWidth
                        value={building}
                        onChange={(e) => setBuilding(e.target.value)}
                        error={!!validationErrors.building}
                        helperText={validationErrors.building?.[0]}
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

                    {/* 更新するボタン */}
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
                        更新する
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Profile;

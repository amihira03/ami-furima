import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import FormHelperText from "@mui/material/FormHelperText";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../lib/axios";
import { extractValidationErrors } from "../utils/handleApiError";
import type { ValidationErrors } from "../types/error";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type Category = {
    id: number;
    name: string;
};

type Condition = {
    id: number;
    name: string;
};

const Sell = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [conditionId, setConditionId] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {},
    );

    const [categories, setCategories] = useState<Category[]>([]);
    const [conditions, setConditions] = useState<Condition[]>([]);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        axiosInstance.get("/categories").then((res) => setCategories(res.data));
        axiosInstance.get("/conditions").then((res) => setConditions(res.data));
    }, []);

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId],
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // 送信処理
    const handleSubmit = async () => {
        setError("");
        setValidationErrors({});

        const formData = new FormData();
        formData.append("name", name);
        formData.append("brand_name", brandName);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("condition_id", conditionId);
        selectedCategories.forEach((id) => {
            formData.append("categories[]", String(id));
        });
        if (image) {
            formData.append("image", image);
        }

        try {
            await axiosInstance.post("/items", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/");
        } catch (err) {
            const errors = extractValidationErrors(err);
            if (Object.keys(errors).length > 0) {
                setValidationErrors(errors);
            } else if (axios.isAxiosError(err)) {
                setError("出品に失敗しました。入力内容を確認してください。");
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
                py: 8,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 4,
                    }}
                >
                    商品出品
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

                    {/* 商品画像*/}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        商品画像
                    </Typography>
                    <Box
                        sx={{
                            border: "0.6px dashed #5a5a5a",
                            borderRadius: "10px",
                            p: 3,
                            mb: validationErrors.image ? 1 : 3,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="text"
                            component="label"
                            sx={{
                                color: "#3d3d3d",
                                px: 2,
                                borderRadius: "20px",
                                background: "rgba(255,255,255,0.4)",
                                "&:hover": {
                                    background: "rgba(255,255,255,0.5)",
                                },
                            }}
                        >
                            ファイルを選択
                            <input
                                type="file"
                                hidden
                                accept=".png,.jpg,.jpeg"
                                onChange={handleImageChange}
                            />
                        </Button>
                        <Typography
                            sx={{ color: "#5a5a5a", fontSize: "0.8rem" }}
                        >
                            {image ? image.name : "選択されていません"}
                        </Typography>
                    </Box>
                    {validationErrors.image && (
                        <Typography
                            sx={{
                                color: "error.main",
                                fontSize: "0.8rem",
                                mb: 3,
                            }}
                        >
                            {validationErrors.image[0]}
                        </Typography>
                    )}

                    {/* 商品名 */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        商品名
                    </Typography>
                    <TextField
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!validationErrors.name}
                        helperText={validationErrors.name?.[0]}
                        slotProps={{ inputLabel: { shrink: true } }}
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

                    {/* ブランド名 */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        ブランド名
                    </Typography>
                    <TextField
                        type="text"
                        fullWidth
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        error={!!validationErrors.brand_name}
                        helperText={validationErrors.brand_name?.[0]}
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

                    {/* 商品説明 */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        商品説明
                    </Typography>
                    <TextField
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        error={!!validationErrors.description}
                        helperText={validationErrors.description?.[0]}
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

                    {/* カテゴリ */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        カテゴリ
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: validationErrors.categories ? 0.5 : 3,
                        }}
                    >
                        {categories.map((category) => (
                            <Chip
                                key={category.id}
                                label={category.name}
                                onClick={() => handleCategoryClick(category.id)}
                                sx={{
                                    background: selectedCategories.includes(
                                        category.id,
                                    )
                                        ? "rgba(255,255,255,0.9)"
                                        : "rgba(255,255,255,0.25)",
                                    color: selectedCategories.includes(
                                        category.id,
                                    )
                                        ? "#000000"
                                        : "#3d3d3d",
                                    cursor: "pointer",
                                    "&:hover": {
                                        background: "rgba(255,255,255,0.6)",
                                    },
                                }}
                            />
                        ))}
                    </Box>
                    {validationErrors.categories && (
                        <Typography
                            sx={{
                                color: "error.main",
                                fontSize: "0.8rem",
                                mb: 3,
                            }}
                        >
                            {validationErrors.categories[0]}
                        </Typography>
                    )}

                    {/* 商品の状態 */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        商品の状態
                    </Typography>
                    <FormControl
                        fullWidth
                        error={!!validationErrors.condition_id}
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
                    >
                        <InputLabel>選択してください</InputLabel>
                        <Select
                            label="選択してください"
                            value={conditionId}
                            onChange={(e) => setConditionId(e.target.value)}
                        >
                            {conditions.map((condition) => (
                                <MenuItem
                                    key={condition.id}
                                    value={condition.id}
                                >
                                    {condition.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {validationErrors.condition_id && (
                            <FormHelperText>
                                {validationErrors.condition_id[0]}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {/* 価格 */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        価格
                    </Typography>
                    <TextField
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        error={!!validationErrors.price}
                        helperText={validationErrors.price?.[0]}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <Typography
                                        sx={{ mr: 1, color: "#5a5a5a" }}
                                    >
                                        ¥
                                    </Typography>
                                ),
                            },
                        }}
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

                    {/* 出品するボタン */}
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
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
                        出品する
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Sell;

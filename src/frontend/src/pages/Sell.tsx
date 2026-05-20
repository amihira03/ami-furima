import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const Sell = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // 複数選択のロジック
    const handleCategoryClick = (category: string) => {
        setSelectedCategories(
            (prev) =>
                prev.includes(category)
                    ? prev.filter((c) => c !== category) // すでに選択済みなら外す
                    : [...prev, category], // 未選択なら追加
        );
    };

    const categories = [
        "ファッション",
        "家電",
        "インテリア",
        "レディース",
        "メンズ",
        "コスメ",
        "本",
        "ゲーム",
        "スポーツ",
        "キッチン",
        "ハンドメイド",
        "アクセサリー",
        "おもちゃ",
        "ベビー・キッズ",
    ];

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
                    {/* 商品画像*/}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        商品画像
                    </Typography>
                    <Box
                        sx={{
                            border: "0.6px dashed #5a5a5a",
                            borderRadius: "10px",
                            p: 3,
                            mb: 3,
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
                            />
                        </Button>
                        <Typography
                            sx={{ color: "#5a5a5a", fontSize: "0.8rem" }}
                        >
                            選択されていません
                        </Typography>
                    </Box>
                    {/* 商品名 */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        商品名
                    </Typography>
                    <TextField
                        type="text"
                        fullWidth
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
                            mb: 3,
                        }}
                    >
                        {categories.map((category) => (
                            <Chip
                                key={category}
                                label={category}
                                onClick={() => handleCategoryClick(category)}
                                sx={{
                                    background: selectedCategories.includes(
                                        category,
                                    )
                                        ? "rgba(255,255,255,0.9)" // 選択中：濃い白
                                        : "rgba(255,255,255,0.25)", // 未選択：薄い白
                                    color: selectedCategories.includes(category)
                                        ? "#000000" // 選択中：黒文字
                                        : "#3d3d3d", // 未選択：グレー文字
                                    cursor: "pointer",
                                    "&:hover": {
                                        background: "rgba(255,255,255,0.6)",
                                    },
                                }}
                            />
                        ))}
                    </Box>
                    {/* 商品の状態 */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        商品の状態
                    </Typography>
                    <FormControl
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
                    >
                        <InputLabel>選択してください</InputLabel>
                        <Select label="選択してください" defaultValue="">
                            <MenuItem value="新品・未使用">
                                新品・未使用
                            </MenuItem>
                            <MenuItem value="未使用に近い">
                                未使用に近い
                            </MenuItem>
                            <MenuItem value="目立った傷や汚れなし">
                                目立った傷や汚れなし
                            </MenuItem>
                            <MenuItem value="やや傷や汚れあり">
                                やや傷や汚れあり
                            </MenuItem>
                            <MenuItem value="傷や汚れあり">
                                傷や汚れあり
                            </MenuItem>
                            <MenuItem value="全体的に状態が悪い">
                                全体的に状態が悪い
                            </MenuItem>
                        </Select>
                    </FormControl>
                    {/* 価格 */}
                    <Typography sx={{ color: "#3d3d3d", mb: 1 }}>
                        価格
                    </Typography>
                    <TextField
                        type="number"
                        fullWidth
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

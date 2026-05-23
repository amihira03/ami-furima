import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";

const Purchase = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                購入手続き
            </Typography>
            <Grid container spacing={4}>
                {/* 左側 */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Box
                        sx={{
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "20px",
                            p: 3,
                        }}
                    >
                        {/* 商品情報 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                                pb: 3,
                                borderBottom: "1px solid rgba(255,255,255,0.3)",
                            }}
                        >
                            {/* 商品画像 */}
                            <Box
                                component="img"
                                src="https://placehold.co/100x100"
                                alt="商品画像"
                                sx={{
                                    borderRadius: "10px",
                                    width: 100,
                                    height: 100,
                                }}
                            />
                            {/* 商品名・価格 */}
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#3d3d3d",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ショルダーバッグ
                                </Typography>
                                <Typography sx={{ color: "#5a5a5a" }}>
                                    ¥3,500
                                </Typography>
                            </Box>
                        </Box>
                        {/* 支払い方法 */}
                        <Typography sx={{ color: "#3d3d3d", mb: 2 }}>
                            支払い方法
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
                                <MenuItem value="コンビニ払い">
                                    コンビニ払い
                                </MenuItem>
                                <MenuItem value="カード払い">
                                    カード払い
                                </MenuItem>
                                <MenuItem value="銀行振込">銀行振込</MenuItem>
                            </Select>
                        </FormControl>
                        {/* 配送先 */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                                pt: 3,
                                borderTop: "1px solid rgba(255,255,255,0.3)",
                            }}
                        >
                            <Typography sx={{ color: "#3d3d3d" }}>
                                配送先
                            </Typography>
                            <Typography
                                sx={{
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                変更する
                            </Typography>
                        </Box>
                        <Typography sx={{ color: "#3d3d3d" }}>
                            〒123-4567 東京都渋谷区...
                        </Typography>
                    </Box>
                </Grid>

                {/* 右側 */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box
                        sx={{
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "20px",
                            p: 3,
                        }}
                    >
                        {/* 商品代金 */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                                pb: 2,
                                borderBottom: "1px solid rgba(255,255,255,0.3)",
                            }}
                        >
                            <Typography sx={{ color: "#3d3d3d" }}>
                                商品代金
                            </Typography>
                            <Typography
                                sx={{ color: "#3d3d3d", fontWeight: "bold" }}
                            >
                                ¥3,500
                            </Typography>
                        </Box>

                        {/* 支払い方法 */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 3,
                            }}
                        >
                            <Typography sx={{ color: "#3d3d3d" }}>
                                支払い方法
                            </Typography>
                            <Typography sx={{ color: "#3d3d3d" }}>
                                未選択
                            </Typography>
                        </Box>

                        {/* 購入するボタン */}
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
                            購入する
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Purchase;

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const MyPage = () => {
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
                    {/* アイコン画像エリア */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            mb: 4,
                        }}
                    >
                        {/* アイコン画像 */}
                        <Avatar sx={{ width: 70, height: 70 }} />
                        {/* 画像選択ボタン */}
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
                            画像を選択する
                        </Button>
                    </Box>
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

                    {/* 郵便番号 */}
                    <TextField
                        label="郵便番号"
                        placeholder="例：123-4567"
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

                    {/* 住所 */}
                    <TextField
                        label="住所"
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

                    {/* 建物名 */}
                    <TextField
                        label="建物名"
                        type="text"
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
                    {/* 更新するボタン */}
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
                        更新する
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default MyPage;

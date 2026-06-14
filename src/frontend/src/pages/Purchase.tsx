import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

type Item = {
    id: number;
    name: string;
    price: number;
    image_path: string;
    user_id: number;
};

const Purchase = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<Item | null>(null);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [error, setError] = useState("");
    const [isOwnItem, setIsOwnItem] = useState(false);

    useEffect(() => {
        axiosInstance.get(`/items/${id}`).then((response) => {
            setItem(response.data);

            axiosInstance.get("/user").then((userResponse) => {
                if (response.data.user_id === userResponse.data.id) {
                    setIsOwnItem(true);
                }
            });
        });
    }, [id]);

    useEffect(() => {
        axiosInstance.get(`/items/${id}`).then((response) => {
            setItem(response.data);
        });
    }, [id]);

    const handlePurchase = async () => {
        try {
            await axiosInstance.post(`/items/${id}/purchase`, {
                payment_method: paymentMethod,
            });
            navigate("/");
        } catch {
            setError("購入に失敗しました");
        }
    };

    if (!item) return null;

    const imageUrl = item.image_path.startsWith("images/")
        ? `http://localhost/${item.image_path}`
        : `http://localhost/storage/${item.image_path}`;

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                購入手続き
            </Typography>

            {error && (
                <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>
            )}

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
                            <Box
                                component="img"
                                src={imageUrl}
                                alt={item.name}
                                sx={{
                                    borderRadius: "10px",
                                    width: 100,
                                    height: 100,
                                    objectFit: "cover",
                                }}
                            />
                            <Box>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: "#3d3d3d",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.name}
                                </Typography>
                                <Typography sx={{ color: "#5a5a5a" }}>
                                    ¥{item.price.toLocaleString()}
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
                            <Select
                                label="選択してください"
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(e.target.value)
                                }
                            >
                                <MenuItem value="convenience_store">
                                    コンビニ払い
                                </MenuItem>
                                <MenuItem value="card">カード払い</MenuItem>
                                <MenuItem value="bank_transfer">
                                    銀行振込
                                </MenuItem>
                            </Select>
                        </FormControl>
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
                                ¥{item.price.toLocaleString()}
                            </Typography>
                        </Box>

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
                                {paymentMethod === "convenience_store" &&
                                    "コンビニ払い"}
                                {paymentMethod === "card" && "カード払い"}
                                {paymentMethod === "bank_transfer" &&
                                    "銀行振込"}
                                {!paymentMethod && "未選択"}
                            </Typography>
                        </Box>

                        {isOwnItem && (
                            <Typography
                                sx={{
                                    color: "red",
                                    mb: 2,
                                    textAlign: "center",
                                }}
                            >
                                自分が出品した商品は購入できません
                            </Typography>
                        )}

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handlePurchase}
                            disabled={!paymentMethod || isOwnItem}
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

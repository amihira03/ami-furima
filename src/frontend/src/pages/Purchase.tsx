import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../lib/axios";
import { extractValidationErrors } from "../utils/handleApiError";
import type { ValidationErrors } from "../types/error";

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
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [building, setBuilding] = useState("");
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {},
    );

    useEffect(() => {
        axiosInstance.get(`/items/${id}`).then((response) => {
            setItem(response.data);

            axiosInstance.get("/user").then((response) => {
                setPostalCode(response.data.postal_code ?? "");
                setAddress(response.data.address ?? "");
                setBuilding(response.data.building ?? "");
            });

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
        setError("");
        setValidationErrors({});
        try {
            await axiosInstance.post(`/items/${id}/purchase`, {
                payment_method: paymentMethod,
                shipping_postal_code: postalCode,
                shipping_address: address,
                shipping_building: building,
            });
            navigate("/");
        } catch (err) {
            const errors = extractValidationErrors(err);
            if (Object.keys(errors).length > 0) {
                setValidationErrors(errors);
                if (
                    errors.shipping_postal_code ||
                    errors.shipping_address ||
                    errors.shipping_building
                ) {
                    setIsEditingAddress(true);
                }
            } else if (axios.isAxiosError(err)) {
                setError("購入に失敗しました");
            } else {
                setError("エラーが発生しました。もう一度お試しください");
            }
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
                            error={!!validationErrors.payment_method}
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
                            {validationErrors.payment_method && (
                                <FormHelperText>
                                    {validationErrors.payment_method[0]}
                                </FormHelperText>
                            )}
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
                                onClick={() =>
                                    setIsEditingAddress(!isEditingAddress)
                                }
                                sx={{
                                    color: "white",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    "&:hover": { textDecoration: "underline" },
                                }}
                            >
                                {isEditingAddress ? "閉じる" : "変更する"}
                            </Typography>
                        </Box>

                        {isEditingAddress ? (
                            <>
                                <TextField
                                    label="郵便番号"
                                    placeholder="例：123-4567"
                                    fullWidth
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                    error={
                                        !!validationErrors.shipping_postal_code
                                    }
                                    helperText={
                                        validationErrors
                                            .shipping_postal_code?.[0]
                                    }
                                    sx={{
                                        mb: 2,
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor:
                                                    "rgba(255,255,255,0.5)",
                                            },
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#5a5a5a",
                                        },
                                    }}
                                />
                                <TextField
                                    label="住所"
                                    fullWidth
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    error={!!validationErrors.shipping_address}
                                    helperText={
                                        validationErrors.shipping_address?.[0]
                                    }
                                    sx={{
                                        mb: 2,
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor:
                                                    "rgba(255,255,255,0.5)",
                                            },
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#5a5a5a",
                                        },
                                    }}
                                />
                                <TextField
                                    label="建物名"
                                    fullWidth
                                    value={building}
                                    onChange={(e) =>
                                        setBuilding(e.target.value)
                                    }
                                    error={!!validationErrors.shipping_building}
                                    helperText={
                                        validationErrors.shipping_building?.[0]
                                    }
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor:
                                                    "rgba(255,255,255,0.5)",
                                            },
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                            color: "#5a5a5a",
                                        },
                                    }}
                                />
                            </>
                        ) : (
                            <Typography sx={{ color: "#3d3d3d" }}>
                                〒{postalCode}
                                <br />
                                {address}
                                <br />
                                {building}
                            </Typography>
                        )}
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

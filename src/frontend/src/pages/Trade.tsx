import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Trade = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Grid container spacing={4}>
                {/* 左側：サイドバー */}
                <Grid size={{ xs: 12, md: 3 }}>
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
                        <Typography
                            variant="h6"
                            sx={{ color: "#3d3d3d", fontWeight: "bold", mb: 2 }}
                        >
                            その他の取引
                        </Typography>
                    </Box>
                </Grid>

                {/* 右側：メイン */}
                <Grid size={{ xs: 12, md: 9 }}>
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
                        <Typography
                            variant="h6"
                            sx={{ color: "#3d3d3d", fontWeight: "bold" }}
                        >
                            取引画面
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Trade;

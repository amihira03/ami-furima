import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Purchase = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Grid container spacing={4}>
                {/* 左側 */}
                <Grid size={{ xs: 12, md: 7 }}>
                    <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: "bold", mb: 4 }}
                    >
                        購入手続き
                    </Typography>
                </Grid>

                {/* 右側 */}
                <Grid size={{ xs: 12, md: 5 }}></Grid>
            </Grid>
        </Container>
    );
};

export default Purchase;

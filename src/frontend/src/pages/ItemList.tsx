import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

const items = [
    {
        id: 1,
        name: "商品A",
        price: 1000,
        image: "https://placehold.co/300x200",
    },
    {
        id: 2,
        name: "商品B",
        price: 2000,
        image: "https://placehold.co/300x200",
    },
    {
        id: 3,
        name: "商品C",
        price: 3000,
        image: "https://placehold.co/300x200",
    },
    {
        id: 4,
        name: "商品D",
        price: 4000,
        image: "https://placehold.co/300x200",
    },
];

const ItemList = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                商品一覧
            </Typography>
            <Grid container spacing={3}>
                {items.map((item) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={item.image}
                                alt={item.name}
                            />
                            <CardContent>
                                <Typography variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography color="text.secondary">
                                    ¥{item.price.toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ItemList;

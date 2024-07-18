import { useState, useEffect } from "react";
import { Grid, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { ITEMS } from "../components/common/functions/items";
import FlashSaleItem from "../components/common/components/FlashSaleItem";
import i18n from "../components/common/components/LangConfig";
import RedButton from "../components/common/components/RedButton";
import WhiteButton from "../components/common/components/WhiteButton";
import Loader from "../components/common/components/Loader";
import { fetchProducts } from "../services/apiProduct";

const AllProducts = () => {
  const [loading, setLoading] = useState(true);
  const [displayedItems, setDisplayedItems] = useState(10);
  const duplicatedItems = Array.from({ length: 2 }, () => ITEMS).flat();
  const totalItems = duplicatedItems.length;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data.data);
        console.log(products[0].images[0]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    window.scrollTo({
      top: window.scrollY - 1500,
      behavior: "smooth",
    });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisplayedItems(displayedItems + 10);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-40 flex flex-col gap-5">
      <Typography variant="h3" align="center" gutterBottom>
        {i18n.t("allProducts.title")}
      </Typography>
      <Container style={{maxWidth: "80%"}}>
        <Grid container spacing={3} justifyContent="center">
          {loading
            ? Array.from({ length: displayedItems }).map((_, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                  <Loader />
                </Grid>
              ))
            : products.slice(0, displayedItems).map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <FlashSaleItem
                    item={item}
                    // totalItems={totalItems}
                    // stars={item.stars}
                    // rates={item.rates}
                  />
                </Grid>
              ))}
        </Grid>
      </Container>
      {displayedItems < totalItems && (
        <button
          onClick={handleLoadMore}
          type="button"
          className="md:mx-auto text-center rounded-md px-5 py-3 mt-8 shadow hover:shadow-md active:shadow-inner transition
            hover:bg-gray-50 border text-[#696A75] hover:text-[#696A75] border-[#696A75] hover:border-[#696A75]
            hover:scale-105 hover:-translate-y-2 transform duration-300 ease-in-out"
        >
          {i18n.t("whiteButtons.loadMore")}
        </button>
      )}
      <div className="mt-6 flex justify-around items-center md:mx-12">
        <Link to="..">
          <WhiteButton name={i18n.t("whiteButtons.backToHomePage")} />
        </Link>
        <Link to="/category">
          <RedButton name={i18n.t("redButtons.exploreByCategory")} />
        </Link>
      </div>
    </div>
  );
};

export default AllProducts;

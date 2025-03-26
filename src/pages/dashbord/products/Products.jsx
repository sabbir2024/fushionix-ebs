import useProduct from "../../../hooks/useProduct";
import ProductHeadTitle from "./ProductHeadTitle";
import ProductTable from "./ProductTable";

const Products = () => {

    const [products, isPending, refetch] = useProduct();
    return (
        <div>

            <ProductHeadTitle products={products} />
            <ProductTable products={products} isPending={isPending} refetch={refetch} />
        </div>
    );
};

export default Products;
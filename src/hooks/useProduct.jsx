import { useSearchParams } from "react-router";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query';


const useProduct = () => {
    const axiosSecure = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get('item') || null;

    const url = search ? `/products?item=${search}` : '/products'

    const { data: products, isPending, refetch } = useQuery({
        queryKey: ['product', search],
        queryFn: async () => {
            const { data } = await axiosSecure.get(url);
            return data
        }
    })
    return [products, isPending, refetch]
};

export default useProduct;
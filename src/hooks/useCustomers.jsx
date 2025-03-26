import { useSearchParams } from "react-router";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const useCustomers = () => {
    const axiosSucure = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('customer_Name') || null;

    const url = search ? `/customers?customer_Name=${search}` : '/customers'

    const { data: customers = [], isPending, refetch } = useQuery({
        queryKey: ['customers', search],
        queryFn: async () => {
            const { data } = await axiosSucure.get(url);
            return data;
        }

    })

    return [customers, isPending, refetch]
};

export default useCustomers;
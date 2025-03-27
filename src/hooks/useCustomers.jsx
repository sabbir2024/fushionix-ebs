import { useSearchParams } from "react-router";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from '@tanstack/react-query'

const useCustomers = () => {
    const axiosSucure = useAxiosSecure();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('customer_name') || null;

    const url = search ? `/customers?customer_name=${search}` : '/customers'

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
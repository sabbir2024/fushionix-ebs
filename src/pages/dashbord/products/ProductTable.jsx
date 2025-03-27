import Swal from "sweetalert2";
import UpdateProducts from "../updateProduct/UpdateProducts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";


const ProductTable = ({ products, isPending, refetch }) => {
    console.log(products)
    const axiosSucure = useAxiosSecure()
    if (isPending) {
        return <div>Loading...</div>;
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: `${item?.name} has been delete`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSucure.delete(`/product-delete/${item?._id}`)
                console.log('%cfushionix-client\src\pages\dashbord\products\ProductTable.jsx:24 data', 'color: #007acc;', data);
                if (data?.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });

    }
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Generic Name</th>
                        <th>Company</th>
                        <th>Qty</th>
                        <th>Cost</th>
                        <th>Price</th>
                        <th>Discount %</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}


                    {
                        products?.map((item, index) => {
                            const discount = ((item.price - item.cost) / item.price) * 100
                            return (
                                <tr className="hover:bg-amber-100" key={item?._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.generic_name}</td>
                                    <td>{item.company_name}</td>
                                    <td>{item?.qty || 0}</td>
                                    <td>{item.cost}</td>
                                    <td>{item.price}</td>
                                    <td>{discount.toFixed(2)} %</td>
                                    {/* todo */}
                                    <td><Link to={`/dashbord/update-product/${item?._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link></td>

                                    <td><button onClick={() => handleDelete(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button></td>
                                </tr>)
                        })
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
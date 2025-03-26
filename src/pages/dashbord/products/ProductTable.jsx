import Swal from "sweetalert2";
import UpdateProducts from "../updateProduct/UpdateProducts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";


const ProductTable = ({ products, isPending, refetch }) => {
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
                                    <td><Link to={`/dashbord/update-product/${item?._id}`}>📝</Link></td>

                                    <td><button onClick={() => handleDelete(item)}>❌</button></td>
                                </tr>)
                        })
                    }

                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
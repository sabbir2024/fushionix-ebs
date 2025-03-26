import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";

const UpdateProducts = () => {
    const item = useLoaderData();
    const [isStop, setStop] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();



    const handelAddedProduct = async (e) => {
        e.preventDefault();

        setStop(true)
        const formData = new FormData(e.target);
        const productData = {
            name: formData.get('name'),
            generic_name: formData.get('generic_name'),
            company_name: formData.get('company_name'),
            cost: parseFloat(formData.get('cost')),
            price: parseFloat(formData.get('price')),
            qty: parseFloat(formData.get('qty')),
        };

        try {
            const { data } = await axiosSecure.patch(`/update-product/${item?._id}`, productData)
            console.log('%cproductData', 'color: #007acc;', item?._id, data);

            if (data?.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Successfully update ${productData?.name} Database `,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            navigate('/dashbord/products')
            setStop(false)
        } catch (error) {
            console.log('%cfushionix-cts.jsx:39 error', 'color: #007acc;', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error?.massage,
            });
            setStop(false);

        }
    }
    return (
        <div>
            <form onSubmit={handelAddedProduct}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={item?.name}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="generic_name">Generic Name</label>
                        <input
                            id="generic_name"
                            name="generic_name"
                            defaultValue={item?.generic_name}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="company_name">Company Name</label>
                        <input
                            id="company_name"
                            name="company_name"
                            defaultValue={item?.company_name}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="cost">Cost</label>
                        <input
                            id="cost"
                            name="cost"
                            defaultValue={item?.cost}
                            type="number"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring [&::-webkit-inner-spin-button]:appearance-none"
                            step="any"
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="price">Price</label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            defaultValue={item?.price}
                            step="any"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="qty">qty</label>
                        <input
                            id="qty"
                            name="qty"
                            type="number"
                            defaultValue={item?.qty}
                            step="any"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        disabled={isStop}
                        className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                    >
                        {isStop ? 'Please Wait' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProducts;
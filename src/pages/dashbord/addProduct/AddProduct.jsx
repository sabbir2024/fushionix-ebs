import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router';
import useProduct from '../../../hooks/useProduct';

const AddProduct = () => {
    const [isStop, setStop] = useState(false)
    const axiosSucure = useAxiosSecure();
    const navigate = useNavigate();
    const [products] = useProduct();


    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const handleInputChange = (e) => {
        const value = e.target.value;
        const matchingProduct = products?.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))


        setFilteredSuggestions(matchingProduct)
    }

    const handelSuggestionClick = (item) => {
        let timerInterval;
        Swal.fire({
            title: "Auto close alert!",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
        navigate(`/dashbord/update-product/${item?._id}`)
    }

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
            const { data } = await axiosSucure.post('/add-product', productData)
            console.log('%cfushionix-client\src\pages\dashbord\addProduct\AddProduct.jsx:22 data', 'color: #007acc;', data);
            if (data?.acknowledged) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Successfully added ${productData?.name} Database `,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            navigate('/dashbord/products')
            setStop(false)
        } catch (error) {
            console.log('%cfushionix-client\src\pages\dashbord\addProduct\AddProduct.jsx:77 error', 'color: #007acc;', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
            setStop(false);

        }

    };

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <form onSubmit={handelAddedProduct}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="generic_name">Generic Name</label>
                            <input
                                id="generic_name"
                                name="generic_name"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="company_name">Company Name</label>
                            <input
                                id="company_name"
                                name="company_name"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="cost">Cost</label>
                            <input
                                id="cost"
                                name="cost"
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
                                step="any"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="qty">Qty</label>
                            <input
                                id="qty"
                                name="qty"
                                type="number"
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
            </section>
            <section>
                {
                    products?.length > 0 ?
                        (
                            filteredSuggestions?.map(item => (
                                <div key={item?._id}>
                                    <button
                                        className='border bg-amber-500 py-2 px-4'
                                        onClick={() => handelSuggestionClick(item)} key={item?._id}>
                                        {item?.name}  ||  {item?.generic_name}  ||  {item?.company_name}
                                    </button>
                                </div>
                            ))) : (
                            <div>No Match</div>
                        )
                }
            </section>
        </div>
    );
};

export default AddProduct;
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useNavigate, useSearchParams } from "react-router";
import Swal from "sweetalert2";
import useCustomers from "../../../hooks/useCustomers";

const AddCustomer = () => {

    const [isStop, setStop] = useState(false);
    const [guardianType, setGuardianType] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [customers, isPending, refetch] = useCustomers();

    const axiosSucure = useAxiosSecure();
    const navigate = useNavigate();


    const handelAddedCustomer = async (e) => {
        e.preventDefault();

        setStop(true);

        const form = e.target;
        const name = form.name.value;
        const age = form.age.value;
        const phone = form.phone.value;
        const guardianName = form.guardianName.value;
        const address = form.address.value;



        const userForm = {
            name,
            phone,
            age,
            guardian: {
                guardianType,
                guardianName
            },
            address
        }

        try {
            const { data } = await axiosSucure.post('/add-customer', userForm);
            console.log(data)
            if (data.acknowledged) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${name} added successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setStop(false);
                navigate('/dashbord/customers')
            }

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
            setStop(false)
        }
    }

    const handleGuardianTypeChange = (e) => {
        setGuardianType(e.target.value);
        setStop(false)
    };


    const handleInputChange = (e) => {
        const srcCustomer = e.target.value
        setSearchParams({ customer_Name: srcCustomer })
    }


    return (

        <>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <form className="relative" onSubmit={handelAddedCustomer}>
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
                            <label className="text-gray-700 dark:text-gray-200 flex gap-4" htmlFor="guardian">
                                Select fast Guardian then Name
                            </label>
                            <div className="join flex w-full">

                                <select
                                    name="guardianType"
                                    onChange={handleGuardianTypeChange}
                                    value={guardianType}
                                    required
                                    className="select join-item flex-1">
                                    <option value="" disabled>Select Guardian</option>
                                    <option value="Father">Father</option>
                                    <option value="Husband">Husband</option>
                                    <option value="Mother">Mother</option>
                                    <option value="Brother">Brother</option>
                                </select>
                                <div>
                                    <div>
                                        <input
                                            id="guardianName"
                                            name="guardianName"
                                            type="text"
                                            className="input join-item w-full flex-2" placeholder="Enter your Guardin Name" />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="age">Age</label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                step="any"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="phone">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="number"
                                step="any"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring [&::-webkit-inner-spin-button]:appearance-none"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="address">Address</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring "

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
            <section className="absolute top-32 left-24">
                <ul className="bg-white">
                    {
                        customers ? (
                            customers?.map(customer => <li className="hover:text-red-600 border hover:cursor-pointer" key={customer?._id}>{customer?.name}    |     {customer?.guardian?.guardianType} :
                                {customer?.guardian?.guardianName}    |    {customer?.address}
                            </li>)

                        ) : (
                            <p>No Match</p>)
                    }
                </ul>
            </section>
        </>
    );
};
export default AddCustomer;
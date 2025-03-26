import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const suggestions = [
    {
        id: 101, name: "John Doe",
        email: "johndoe@example.com",
        age: 29,
        location: "Dhaka, Bangladesh"
    },
    {
        id: 102,
        name: "Jane Smith",
        email: "janesmith@example.com",
        age: 34,
        location: "New York, USA"
    },
    {
        id: 103,
        name: "Ali Khan",
        email: "alikhan@example.com",
        age: 25,
        location: "Karachi, Pakistan"
    },
    {
        id: 104,
        name: "Maria Gonzalez",
        email: "mariagonzalez@example.com",
        age: 31,
        location: "Madrid, Spain"
    },
    {
        id: 105,
        name: "Kenji Tanaka",
        email: "kenjitanaka@example.com",
        age: 27,
        location: "Tokyo, Japan"
    }];
const AddCustomer = () => {

    const [isStop, setStop] = useState(false);
    const [guardianType, setGuardianType] = useState('');

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
                setStop(false)
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
    };


    const handleInputChange = () => {

    }


    return (

        <>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <form onSubmit={handelAddedCustomer}>
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
        </>
    );
};
export default AddCustomer;
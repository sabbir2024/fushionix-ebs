import Swal from "sweetalert2";
import useCustomers from "../../../hooks/useCustomers";
import CustomerTable from "./CustomerTable";
import Header from "./Header";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Customers = () => {
    const [customers, isPending, refetch] = useCustomers();
    const axiosSucure = useAxiosSecure();
    const handleDelete = (customerInfo) => {
        Swal.fire({
            title: "Are you sure?",
            text: `${customerInfo?.name} has been Delete!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    const { data } = await axiosSucure.delete(`/customer-delete/${customerInfo?._id}`)

                    if (data?.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch()
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message
                    });
                }


            }
        });
    }
    return (
        <div>
            <Header customers={customers} isPending={isPending} refetch={refetch} />
            <CustomerTable customers={customers} isPending={isPending} refetch={refetch} handleDelete={handleDelete} />
        </div>
    );
};

export default Customers;
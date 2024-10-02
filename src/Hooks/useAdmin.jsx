import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const email = user?.email;
    const axiosSecure=useAxiosSecure()

    const { data: isAdmin = false, isLoading } = useQuery({
        queryKey: [email, 'isAdmin'],
        queryFn: async () => {
            if (!email) {
                return false; // No need to make a request if the email is undefined
            }
            const res = await axiosSecure.get(`/users/admin/${email}`); 
            console.log('API response:', res.data)           
            return res.data?.admin;
        },
        enabled: !!email, // Ensure the query only runs if an email is present
    });

    return [isAdmin, isLoading];
};

export default useAdmin;

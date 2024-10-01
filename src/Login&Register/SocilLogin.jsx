import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";


const SocilLogin = () => {

    const axiosPublic=useAxiosPublic()

    const googleProvider=new GoogleAuthProvider()

    const {signInPop}=useContext(AuthContext)
    const SocilSign=()=>{
        
        try {
            signInPop(googleProvider)
            .then(res => {
                // console.log(res);
                const userData={
                    email:res.user?.email,
                    name:res.user?.displayName,
                    photo:res.user?.photoURL
                }
                axiosPublic.post('/users', userData)
                })
        }
         catch (error) {
             console.error(error);
        }
    }
    return (
        <div>
            
            <button onClick={SocilSign} className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-4">
                <i className="fab fa-google text-red-500 mr-2"></i>
                <span className="text-purple-600 font-medium">Continue With Google</span>
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-4">
                <i className="fab fa-twitter text-blue-500 mr-2"></i>
                <span className="text-purple-600 font-medium">Continue With GitHub</span>
            </button>
            <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <span className="mx-2 text-gray-500">OR</span>
                <hr className="flex-grow border-gray-300" />
            </div>
        </div>
    );
};

export default SocilLogin;
import {useState} from "react";
import {register} from "@/api/auth";
import {useNavigate} from "react-router-dom";
import {Card,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from '@/components/ui/input';
import {Link} from "react-router-dom";

export default function Signup(){
    const [formData,setFormData] = useState({name:"",email:"",password:""});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await register(formData);
            const token = res.data.token;

            localStorage.setItem("token",token);
            
            navigate("/home");//Redirect to homepage
        } catch (err){
            console.error("Failed to signup:",err)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                          placeholder="Enter full name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData,name:e.target.value})}
                          required
                        />

                        <Input
                          placeholder="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData,email:e.target.value})}
                          required
                        />
                        <Input
                          placeholder="Password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData,password:e.target.value})}
                          required
                        />
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                            Sign Up
                        </Button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
                        Already have an account?{" "}
                        <Link to="/login" className="text-emerald-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
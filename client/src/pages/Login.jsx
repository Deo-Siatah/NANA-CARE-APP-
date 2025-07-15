import { useState } from "react";
import {login} from "@/api/auth";
import {useNavigate} from "react-router-dom";
import {Card,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";

export default function Login() {
    const [formData,setFormData] = useState({email: "",password:""});
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const res = await login(formData);
            const token = res.data.token;

            localStorage.setItem("token",token);

            

            navigate('/home');
        } catch (err) {
            console.error("Login error",err);        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Log In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              Log In
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/" className="text-emerald-600 hover:underline">
                    Signup
                </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
    
}
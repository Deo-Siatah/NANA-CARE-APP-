import { useState } from "react";
import {login} from "@/api/auth";
import {useNavigate} from "react-router-dom";
import {Card,CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";
import {toast} from "sonner";
import {Loader2} from "lucide-react";

export default function Login() {
    const [formData,setFormData] = useState({email: "",password:""});
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return; //prevent double submits
        setLoading(true);
        try{
            const res = await login(formData);
            const token = res.data.token;

            if (!token) {
              toast.error("Login failed:missing token");
              return;
            }

            localStorage.setItem("token",token);
            toast.success("Login succesfull");

            navigate('/');
        } catch (err) {
            const status = err?.response?.status;
            const msg = err?.response?.data?.message;

            if (status === 401){
              toast.error("Incorrect password");
            } else if (status === 404){
              toast.error("User Not Found")
            } else if (status === 400){
              toast.error(msg || "Invalid request");
            } else if (status >= 500) {
              toast.error("Server error.Please try again.");
            } else {
              toast.error(msg || "Something went wrong")
            }
            console.error("Login error",err);    
          
          } finally {
            setLoading(false);
          }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">Log In</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Email"
              type="email"
              className="mt-1 bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={formData.email}
              autoComplete="email"
              disabled = {loading}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              placeholder="Password"
              type="password"
              className="mt-1 bg-gray-100 dark:bg-gray-700 dark:text-white"
              value={formData.password}
              autoComplete="current-password"
              disabled = {loading}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" disabled={loading}>
              { loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Loggin in..
                </>
              ) : (
                "Log In"
              ) }
            </Button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/signup" className="text-emerald-600 hover:underline">
                    Signup
                </Link>
            </p>
        </CardContent>
      </Card>
    </div>
  );
    
}
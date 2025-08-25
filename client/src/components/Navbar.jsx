import {Button} from "@/components/ui/button";
import {Shield} from "lucide-react";
import {Link} from "react-router-dom"; 

export default function Navbar(){
    return(
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Shield className="h-8 w-8 text-emerald-600"/>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Nana Care</span>
                    </div>
                    <nav className=" md:flex items-center space-x-6">
                        <Link
                            to="/explore"
                            className="text-gray-600 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400"
                        >
                            Find Workers
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                        >
                            About
                        </Link>
                        <Link
                            to="/training"
                            className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                        >
                            Training
                        </Link>
                        <Link
                            to="/login"
                        >
                             <Button variant="outline" size="sm"  className="dark:text-white border dark:border-gray-500">Login</Button>
                        </Link>
                    </nav>
                </div>

            </div>
        </header>
    );
}
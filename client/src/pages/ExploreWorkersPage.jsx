import {useEffect,useState} from "react";
import api from "@/api/axios";
import { getAllWorkers } from "@/api/workers";
import {Button} from "@/components/ui/button";
import {Card,CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Star,Heart,MapPin,Shield,Filter} from "lucide-react";
import {Link} from "react-router-dom";

export default function ExploreWorkersPage(){
    const [workers,setWorkers] = useState([])

    useEffect(() => {
        
        async function fetchWorkers(){
            try{
                const res = await getAllWorkers()
                setWorkers(res.data)
            } catch (error){
                console.error("❌Failed to fetch workers:",err)
            }
        }
        fetchWorkers()
    },[])
//     console.log("🔍 Each worker:", workers);
// workers.forEach((w, i) => {
//   console.log(`Worker ${i}`, {
//     user: w.user,
//     id: w.user?._id,
//     typeofUser: typeof w.user,
//   });
// });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/*Header*/}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-2">
                          <Shield className="h-8 w-8 text-emerald-600"/>
                          <span className="text-xl font-bold text-gray-900 dark:text-white">Nana Care</span>
                        </Link>
                        <nav className="hidden md:flex items-center space-x-6">
                            <Link to="/login">
                            <Button variant="outline" size="sm">Logout</Button>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {/*Page Header*/}
                <div className="mb-8">
                    <p className="text-gray-600 dark:text-gray-300 md:text-xl">Find domestic workers verified and rated by real employers.</p>
                </div>

                {/*Filters*/}
                <Card className="mb-8">
                    <CardContent className="p-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        <div className="flex items-center space-x-2 mb-4">
                            <Filter className="h-5 w-5 text-gray-500"/>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>

                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                                <Select >
                                    <SelectTrigger><SelectValue placeholder="Select location"/></SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md rounded-md" >
                                        <SelectItem value="nairobi">Nairobi</SelectItem>
                                        <SelectItem value="kisumu">Kisumu</SelectItem>
                                        <SelectItem value="mombasa">Mombasa</SelectItem>
                                        <SelectItem value="nakuru">Nakuru</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Minimum Rating</label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Any rating"/></SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md rounded-md">
                                        <SelectItem value="4.5">4.5+ stars</SelectItem>
                                        <SelectItem value="4.0">4.0+ stars</SelectItem>
                                        <SelectItem value="3.5">3.5+ stars</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ">Skills</label>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select skils"/></SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-md rounded-md">
                                        <SelectItem value="nanny">Nanny</SelectItem>
                                        <SelectItem value="cleaning">Cleaning</SelectItem>
                                        <SelectItem value="cooking">Cooking</SelectItem>
                                        <SelectItem value="elderly-care">Elderly Care</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Apply Filters</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/*Worker Cards*/}
                <div className="flex flex-wrap justify-evenly items-stretch gap-6 px-4 md:px-8">
                    {workers.map((worker) => (
                        <Card key={worker._id} className="w-full sm:w-[45%] lg:w-[30%] xl:w-[22%] max-w-sm hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                            <CardContent className="p-6">
                                <div className="relative mb-4">
                                    <img
                                        src={ worker.photoUrl || "/placeholder.svg"}
                                        alt={worker.user?.name}
                                        width={200}
                                        height={200}
                                        className="w-50 h-50 object-cover rounded-full mx-auto"
                                    />
                                    
                                    {worker.isVerified && (
                                        <>
                                        <div className="absolute top-2 right-2 z-20">
                                        <Badge className="bg-emerald-600 text-white flex items-center space-x-1 px-2 py-1 text-xs shadow-md">
                                            <Shield className="h-3 w-3 mr-1"/>
                                            Verified
                                        </Badge>
                                        </div>
                                        </>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                            {worker.user?.name}
                                        </h3>
                                        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                                            <MapPin className="h-4 w-4"/>
                                            <span>{worker.location}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                                                <span className="font-medium dark:text-white">{worker.rating || "3.0"}</span>
                                                <span className="text-sm text-gray-500 dark:text-white">({worker.reviews || 12})</span>
                                            </div>
                                            <div className="flex items-center space-x-1 text-red-500">
                                                <Heart className="h-4 w-4"/>
                                                <span className="text-sm">{worker.likes || 5}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                            {worker.bio || "No bio provided"}
                                        </p>

                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {(worker.skills || []).map((skill,index) => (
                                                <Badge key={index} variant="secondary" className="text-xs bg-green-100 dark:bg-green-100">
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                        {/*View Profile*/}

                                   
                                        <Link to={`/worker/${worker.user._id}`}>
                                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                                                View Profile
                                                
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {/*Load more*/}
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className=" bg-emerald-600 hover:bg-emerald-700">Load More Workers</Button>
                </div>
            </div>
        </div>
    );
}
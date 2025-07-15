import {Calendar,MapPin} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Card,CardContent} from "@/components/ui/card";

export default function TrainingCard({training}){
    return (
        <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 space-y-3">
                {/*Training Name*/}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {training.name}
                </h3>
                {/*Location*/}
                <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-emerald-600"/>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {training.location}
                    </span>
                </div>
                {/*Date*/}
                <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500"/>
                    <span className="text-gray-600 dark:text-gray-300">
                        {new Date(training.date).toLocaleDateString()}
                    </span>
                </div>
                {/*Description*/}
                {training.description && (
                    <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                        {training.description}
                    </p>
                )}

                {/*Badge*/}
                <Badge
                    variant="secondary"
                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                >
                    {training.spots ? `${training.spots} spots available`: "TBA"}
                </Badge>

            </CardContent>
        </Card>
    );
}
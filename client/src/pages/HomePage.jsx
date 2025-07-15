import {useState,useEffect} from "react";
import { getTrainings } from "@/api/training";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Phone,Star,Heart,Shield} from "lucide-react";
import {Link} from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrainingCard from "@/components/TrainingCard";

export default function HomePage() {
    const [upcomingTrainings,setUpcomingTrainings] = useState([]);

    useEffect (() => {
        getTrainings()
            .then((res) => setUpcomingTrainings(res.data))
            .catch((err) => console.error("Error loading trainings:",err));
    },[]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Hotline */}
      <div className="bg-emerald-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center space-x-2 text-sm">
            <Phone className="h-4 w-4" />
            <span className="font-medium">24/7 Helpline: +254 712 345 678</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Empowering Kenya's Domestic Workers with{" "}
            <span className="text-emerald-600">Dignity & Trust</span>
          </h1>
          <p className="text-base md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Connecting verified domestic workers with trusted employers across Kenya. We ensure fair wages and
            professional development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/explore">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                Explore Workers
              </Button>
            </Link>
            <Link to="/workerprofile">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-100 px-8 py-3"
              >
                Register as Worker
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center  gap-6 text-center">
          {[ 
            {
              icon: <Shield className="h-12 w-12 text-emerald-600 mx-auto mb-4" />,
              title: "Verified Workers",
              desc: "Background-checked and verified by our admin team"
            },
            {
              icon: <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />,
              title: "Trusted Reviews",
              desc: "Transparent ratings from real employer feedback"
            },
            {
              icon: <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />,
              title: "Fair Treatment",
              desc: "Promoting fair wages and safe working conditions"
            }
          ].map((feature, i) => (
            <Card key={i} className="p-6 shadow-lg border-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Training Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Training Sessions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10">
            Professional development opportunities across Kenya
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingTrainings.map((training, index) => (
              <TrainingCard key={index} training={training} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
    )
};
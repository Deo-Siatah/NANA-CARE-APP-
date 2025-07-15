import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getWorkerById } from "@/api/workers";
import { getReviewsForUser } from "@/api/reviews";
import { createReview } from "@/api/reviews";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

import { Star, Heart, MapPin, Shield, Phone, MessageCircle } from "lucide-react";

export default function WorkerProfilePage() {
  const { userId } = useParams();
  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");
  const [isAnonymous,setIsAnonymous] = useState(false);

const handleSubmitReview = async () => {
    const token = localStorage.getItem("token");
    if (!token){
        alert("please log in to submit review")
        return;
    }
    if (rating === 0 || comment.trim() === ""){
        alert("Please provide a rating and comment")
        return;
    }
    try {
        const res = await createReview({
            stars: rating,
            comment,
            isAnonymous,
            target: worker.user._id,
        },
        token
    );
        const newReview = res.data;

        //prepend the new review
        setReviews((prev) => [newReview,...prev]);
        //Reset Form
        setRating(0);
        setComment("");
        setIsAnonymous(false)
    } catch (err){
        console.error("Review submmission failed:",err)
        alert("Failed to submit review.")
    }
};


  useEffect(() => {
    async function fetchData() {
      if (!userId) return console.warn("No userId available");

      try {
        const res = await getWorkerById(userId);
        const workerData = res.data;
        setWorker(workerData);

        const reviewUserId = workerData.user._id;
        const reviewsRes = await getReviewsForUser(reviewUserId);
        setReviews(reviewsRes.data);

      } catch (err) {
        console.error("Failed to fetch worker or reviews:", err);
      }
    }

    fetchData();
  }, [userId]);

  if (!worker) {
    return <p className="text-center py-12 text-gray-600 dark:text-gray-300">Loading worker profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/home" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Nana Care</span>
            </Link>
            <Link to="/explore" className="text-emerald-600 hover:text-emerald-700">
              ← Back to Workers
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative">
                    <img
                      src={worker.photoUrl || "/placeholder.svg"}
                      alt={worker.user?.name || "Worker"}
                      width={400}
                      height={400}
                      className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg mx-auto md:mx-0"
                    />
                    {worker.isVerified && (
                      <Badge className="absolute top-2 right-2 bg-emerald-600 text-white">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{worker.user?.name}</h1>
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{worker.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg dark:text-white">{worker.rating}</span>
                        <span className="text-gray-500">({worker.reviewsCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-red-500">
                        <Heart className="h-5 w-5" />
                        <span>{worker.likes} likes</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-emerald-600 hover:bg-emerald-700 flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Hire This Worker
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent dark:text-white dark:border-gray-600">
                        <MessageCircle className="h-4 w-4 mr-2 dark:text-white" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bio */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:text-white">
              <CardHeader>
                <CardTitle>About {worker.user?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{worker.bio}</p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Reviews from Employers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-gray-700 dark:text-gray-400">No reviews yet.</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {review.isAnonymous ? "Anonymous" : review.reviewer?.name}
                          </span>
                          <div className="flex flex-wrap items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Rate This Worker */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Rate This Worker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Rating</label>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} 
                    className={`h-6 w-6 text-gray-300 hover:text-yellow-400 cursor-pointer ${
                        i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                    onClick={() => setRating(i + 1)}
                    
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Review</label>
                <Textarea
                  placeholder="Share your experience working with this person..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                type="checkbox" 
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded" 
                />
                <label htmlFor="anonymous" className="text-sm text-gray-600 dark:text-gray-300">
                  Submit anonymously
                </label>
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={handleSubmitReview}
              >
                Submit Review
                </Button>
            </CardContent>
          </Card>

          {/* Report Concern */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                Report Concern
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkerProfile } from "@/api/workers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield } from "lucide-react";

const SKILLS = [
  "Nanny/Childcare",
  "House Cleaning",
  "Cooking",
  "Elderly Care",
  "Pet Care",
  "Laundry",
];

export default function RegisterWorkerForm() {
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();


  const handleCheckboxChange = (skill) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to register as a worker.");
      return;
    }

    const data = {
      location,
      bio,
      skills,
      photoUrl,
    };

    try {
      await createWorkerProfile(data, token);
      alert("Worker profile created successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Worker registration failed", err);
      alert("Failed to create worker profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Create Your Worker Profile
            </h2>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg text-sm text-emerald-800 dark:text-emerald-200 flex items-start gap-2 mb-6">
              <Shield className="h-4 w-4 mt-1" />
              All profiles are verified by our admin team before going live.
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Nairobi"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 bg-gray-100 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">
                  Bio / Description
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell employers about your experience, skills, and work ethic..."
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 bg-gray-100 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              {/* Skills */}
              <div>
                <Label className="text-gray-700 dark:text-gray-300">Skills & Services</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                  {SKILLS.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center space-x-2 text-sm text-gray-800 dark:text-gray-200"
                    >
                      <input
                        type="checkbox"
                        checked={skills.includes(skill)}
                        onChange={() => handleCheckboxChange(skill)}
                        className="form-checkbox w-4 h-4 text-emerald-600 dark:bg-gray-800 dark:border-gray-600"
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <Label htmlFor="photoUrl" className="text-gray-700 dark:text-gray-300">
                  Photo URL
                </Label>
                <Input
                  id="photoUrl"
                  placeholder="Paste a link to your profile photo"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="mt-1 bg-gray-100 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Submit Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

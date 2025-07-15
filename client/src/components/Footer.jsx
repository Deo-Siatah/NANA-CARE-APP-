// src/components/Footer.jsx
import { Phone, Shield } from "lucide-react";
import {Link} from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 dark:bg-gray-800 border border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-emerald-400" />
              <span className="text-lg font-bold">Nana Care</span>
            </div>
            <p className="text-gray-400 text-sm">Empowering the hands that run our homes.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Workers</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/register" className="hover:text-white">Register</Link></li>
              <li><Link to="/training" className="hover:text-white">Training</Link></li>
              <li><Link to="/support" className="hover:text-white">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/explore" className="hover:text-white">Find Workers</Link></li>
              <li><Link to="/register" className="hover:text-white">Register</Link></li>
              <li><Link to="/guidelines" className="hover:text-white">Guidelines</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+254 768 659 047</span>
              </div>
              <p>support@nanacare.ke</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Nana Care. All rights reserved. |
            <em className="ml-2">"Empowering the hands that run our homes."</em>
          </p>
        </div>
      </div>
    </footer>
  );
}


import React from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { MapComponent } from '@/components/MapComponent';
import { SpotCard } from '@/components/SpotCard';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Navigation, Search } from 'lucide-react';

// Mock data for recently reported spots
const recentSpots = [
  {
    id: 1,
    location: "Carrer de Mallorca, 401",
    distance: "0.3 km",
    availableSince: "5 mins ago",
    reportedBy: "Maria S."
  },
  {
    id: 2,
    location: "Avinguda Diagonal, 211",
    distance: "0.7 km",
    availableSince: "12 mins ago",
    reportedBy: "Carlos T."
  },
  {
    id: 3,
    location: "Carrer de Provença, 184",
    distance: "1.2 km",
    availableSince: "25 mins ago",
    reportedBy: "Anna G."
  }
];

const Index = () => {
  return (
    <Layout>
      <div className="container px-4 mx-auto py-6">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-barcelona-blue to-blue-600 rounded-xl p-6 md:p-10 text-white">
            <div className="md:max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Find Available Parking Spots in Barcelona
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Real-time community-powered parking spot finder. Report spots, earn points, and find parking easily.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/map">
                  <Button size="lg" className="bg-white text-barcelona-blue hover:bg-white/90 rounded-full px-6">
                    <Search size={18} className="mr-2" />
                    Find Spots
                  </Button>
                </Link>
                <Link to="/report">
                  <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-6">
                    <Plus size={18} className="mr-2" />
                    Report a Spot
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Preview Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Parking Map</h2>
            <Link to="/map" className="text-barcelona-blue font-medium hover:underline flex items-center">
              Full Map
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <div className="h-80 md:h-96">
            <MapComponent />
          </div>
        </section>
        
        {/* Recent Spots Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recently Reported</h2>
            <Link to="/map" className="text-barcelona-blue font-medium hover:underline flex items-center">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSpots.map((spot) => (
              <SpotCard
                key={spot.id}
                id={spot.id}
                location={spot.location}
                distance={spot.distance}
                availableSince={spot.availableSince}
                reportedBy={spot.reportedBy}
              />
            ))}
          </div>
        </section>
        
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="bg-barcelona-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={24} className="text-barcelona-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Find Parking</h3>
              <p className="text-gray-600">
                Search for available parking spots near your destination in Barcelona.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="bg-barcelona-orange/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation size={24} className="text-barcelona-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Navigate There</h3>
              <p className="text-gray-600">
                Get directions to the available parking spot with just one tap.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="bg-barcelona-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-barcelona-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Report Spots</h3>
              <p className="text-gray-600">
                Help the community by reporting free spots you find and earn points.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section>
          <div className="bg-gradient-to-r from-barcelona-orange to-orange-500 rounded-xl p-6 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Find Parking in Barcelona?</h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Join our community today and make parking in Barcelona easier for everyone.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-barcelona-orange hover:bg-white/90 rounded-full px-6">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-6">
                  Browse Map
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;

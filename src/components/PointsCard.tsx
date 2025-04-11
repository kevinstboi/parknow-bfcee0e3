
import React from 'react';
import { Trophy, Star, MapPin, Calendar } from 'lucide-react';

interface PointsCardProps {
  totalPoints: number;
  level: string;
  nextLevelPoints: number;
  recentActivities: {
    id: number;
    type: string;
    points: number;
    date: string;
    location?: string;
  }[];
}

export const PointsCard = ({ totalPoints, level, nextLevelPoints, recentActivities }: PointsCardProps) => {
  // Calculate progress percentage
  const progressPercentage = Math.min(
    (totalPoints / nextLevelPoints) * 100,
    100
  );
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="bg-barcelona-blue/10 p-3 rounded-full mr-4">
            <Trophy size={28} className="text-barcelona-blue" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{totalPoints} Points</h2>
            <p className="text-gray-500">Current level: {level}</p>
          </div>
        </div>
        
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
          <Star size={18} className="text-barcelona-orange mr-2" />
          <span className="text-sm font-medium">
            {nextLevelPoints - totalPoints} points to next level
          </span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-barcelona-blue rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* Recent Activities */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        
        {recentActivities.length > 0 ? (
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start border-l-2 border-barcelona-blue pl-4 py-1">
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{activity.type}</span>
                    <span className="text-barcelona-blue font-medium">+{activity.points} pts</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-3">{activity.date}</span>
                    
                    {activity.location && (
                      <>
                        <MapPin size={14} className="mr-1" />
                        <span>{activity.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No recent activities</p>
            <p className="text-sm mt-2">Report parking spots to earn points!</p>
          </div>
        )}
      </div>
    </div>
  );
};

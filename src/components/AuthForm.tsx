
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (type === 'login') {
        toast({
          title: "Logged in successfully!",
          description: "Welcome back to ParkBCN.",
        });
      } else {
        toast({
          title: "Account created successfully!",
          description: "Welcome to ParkBCN. Start finding and reporting parking spots!",
        });
      }
      
      // Navigate to homepage after successful auth
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <MapPin size={24} className="text-barcelona-blue" />
          <span className="font-bold text-lg ml-2">ParkBCN</span>
        </div>
        <h1 className="text-2xl font-bold">
          {type === 'login' ? 'Welcome Back' : 'Create an Account'}
        </h1>
        <p className="text-gray-600 mt-1">
          {type === 'login' 
            ? 'Sign in to access your parking spots and points' 
            : 'Join our community and start finding parking spots'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="rounded-lg"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="rounded-lg"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={type === 'login' ? 'Enter your password' : 'Create a password'}
            required
            className="rounded-lg"
          />
          
          {type === 'login' && (
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-barcelona-blue hover:underline">
                Forgot password?
              </Link>
            </div>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full bg-barcelona-blue hover:bg-barcelona-blue/90 text-white py-2 rounded-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
              {type === 'login' ? 'Signing In...' : 'Creating Account...'}
            </div>
          ) : (
            type === 'login' ? 'Sign In' : 'Create Account'
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {type === 'login' ? "Don't have an account?" : "Already have an account?"}
          <Link 
            to={type === 'login' ? '/signup' : '/login'} 
            className="ml-1 text-barcelona-blue hover:underline font-medium"
          >
            {type === 'login' ? 'Sign Up' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
};

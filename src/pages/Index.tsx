import React from 'react';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { MapComponent } from '@/components/MapComponent';
import { SpotCard } from '@/components/SpotCard';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Plus, 
  Navigation, 
  Search, 
  User, 
  Map as MapIcon, 
  Award 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const recentSpots = [
  {
    id: 1,
    location: "Carrer de Mallorca, 401",
    distance: "0.3 km",
    availableSince: "hace 5 mins",
    reportedBy: "María S."
  },
  {
    id: 2,
    location: "Avinguda Diagonal, 211",
    distance: "0.7 km",
    availableSince: "hace 12 mins",
    reportedBy: "Carlos T."
  },
  {
    id: 3,
    location: "Carrer de Provença, 184",
    distance: "1.2 km",
    availableSince: "hace 25 mins",
    reportedBy: "Anna G."
  }
];

const previewParkingSpots = [
  { id: 1, lat: 41.3851, lng: 2.1734, location: "Carrer de Mallorca, 401", available: true, updatedAt: 'hace 10 mins' },
  { id: 2, lat: 41.3870, lng: 2.1698, location: "Plaça de Catalunya", available: true, updatedAt: 'hace 15 mins' },
  { id: 3, lat: 41.3917, lng: 2.1649, location: "Passeig de Gràcia", available: true, updatedAt: 'hace 30 mins' },
];

const Index = () => {
  return (
    <Layout>
      <div className="container px-4 mx-auto py-6">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-barcelona-blue to-blue-600 rounded-xl p-6 md:p-10 text-white">
            <div className="md:max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Encuentra Plazas de Aparcamiento Disponibles en Barcelona
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Buscador de plazas de aparcamiento en tiempo real impulsado por la comunidad. Reporta plazas, gana puntos y encuentra aparcamiento fácilmente.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/map">
                  <Button size="lg" className="bg-white text-barcelona-blue hover:bg-white/90 rounded-full px-6">
                    <Search size={18} className="mr-2" />
                    Buscar Plazas
                  </Button>
                </Link>
                <Link to="/report">
                  <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-6">
                    <Plus size={18} className="mr-2" />
                    Reportar una Plaza
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-barcelona-blue/10 flex items-center justify-center mb-4">
                <MapIcon className="text-barcelona-blue h-6 w-6" />
              </div>
              <CardTitle>Buscar Plaza</CardTitle>
              <CardDescription>Encuentra aparcamiento cercano en tiempo real</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/map">
                <Button className="bg-barcelona-blue hover:bg-barcelona-blue/90 rounded-full">
                  <Search className="mr-2 h-4 w-4" />
                  Abrir Mapa
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-barcelona-orange/10 flex items-center justify-center mb-4">
                <MapPin className="text-barcelona-orange h-6 w-6" />
              </div>
              <CardTitle>Reportar Plaza</CardTitle>
              <CardDescription>Ayuda a otros usuarios reportando plazas libres</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/report">
                <Button className="bg-barcelona-orange hover:bg-barcelona-orange/90 rounded-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Reportar
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
                <Award className="text-emerald-500 h-6 w-6" />
              </div>
              <CardTitle>Mis Puntos</CardTitle>
              <CardDescription>Gestiona tus puntos y nivel de usuario</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/points">
                <Button className="bg-emerald-500 hover:bg-emerald-600 rounded-full">
                  <User className="mr-2 h-4 w-4" />
                  Ver Puntos
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Mapa de Aparcamiento</CardTitle>
                <CardDescription>Vista previa de plazas disponibles</CardDescription>
              </div>
              <Link to="/map" className="text-barcelona-blue font-medium hover:underline flex items-center">
                Mapa Completo
                <Navigation className="w-4 h-4 ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="h-80 md:h-96 rounded-lg overflow-hidden">
                <MapComponent parkingSpots={previewParkingSpots} />
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Reportados Recientemente</CardTitle>
                <CardDescription>Últimas plazas libres reportadas</CardDescription>
              </div>
              <Link to="/map" className="text-barcelona-blue font-medium hover:underline flex items-center">
                Ver Todos
                <Navigation className="w-4 h-4 ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </section>
        
        <section>
          <div className="bg-gradient-to-r from-barcelona-orange to-orange-500 rounded-xl p-6 md:p-10 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Listo para Encontrar Aparcamiento en Barcelona?</h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Únete a nuestra comunidad hoy y haz que aparcar en Barcelona sea más fácil para todos.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-barcelona-orange hover:bg-white/90 rounded-full px-6">
                  Crear Cuenta Gratuita
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 rounded-full px-6">
                  Explorar Mapa
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

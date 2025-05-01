
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface AuthFormProps {
  type: 'login' | 'signup';
}

// Schema para validación de formulario
const loginSchema = z.object({
  email: z.string().email({ message: 'Introduce un correo electrónico válido' }),
  password: z.string().min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
});

const signupSchema = loginSchema.extend({
  username: z.string().min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    .max(20, { message: 'El nombre de usuario no puede tener más de 20 caracteres' })
    .regex(/^[a-zA-Z0-9_]+$/, { message: 'El nombre de usuario solo puede contener letras, números y guiones bajos' }),
  full_name: z.string().min(2, { message: 'El nombre completo es requerido' }),
});

export const AuthForm = ({ type }: AuthFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  
  // Definir el esquema basado en el tipo de formulario
  const schema = type === 'login' ? loginSchema : signupSchema;
  
  // Configurar react-hook-form con validación zod
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      ...(type === 'signup' && { username: '', full_name: '' }),
    },
  });
  
  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSubmitting(true);
    
    try {
      if (type === 'login') {
        await signIn(data.email, data.password);
      } else {
        // TypeScript no infiere correctamente los campos adicionales en modo signup
        const signupData = data as z.infer<typeof signupSchema>;
        await signUp(
          signupData.email,
          signupData.password,
          {
            username: signupData.username,
            full_name: signupData.full_name,
          }
        );
      }
      
      // Navegar a la página principal
      navigate('/');
    } catch (error) {
      // Los errores ya se manejan en el contexto de autenticación
      console.error('Error en autenticación:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <MapPin size={24} className="text-barcelona-blue" />
          <span className="font-bold text-lg ml-2">ParkBCN</span>
        </div>
        <h1 className="text-2xl font-bold">
          {type === 'login' ? 'Bienvenido de Nuevo' : 'Crear una Cuenta'}
        </h1>
        <p className="text-gray-600 mt-1">
          {type === 'login' 
            ? 'Inicia sesión para acceder a tus plazas de aparcamiento y puntos' 
            : 'Únete a nuestra comunidad y comienza a encontrar plazas de aparcamiento'}
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {type === 'signup' && (
            <>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nombre de Usuario</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Introduce tu nombre de usuario"
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Introduce tu nombre completo"
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Introduce tu correo electrónico"
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder={type === 'login' ? 'Introduce tu contraseña' : 'Crea una contraseña'}
                    className="rounded-lg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {type === 'login' && (
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-barcelona-blue hover:underline">
                ¿Olvidaste la contraseña?
              </Link>
            </div>
          )}
          
          <Button
            type="submit"
            className="w-full bg-barcelona-blue hover:bg-barcelona-blue/90 text-white py-2 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                {type === 'login' ? 'Iniciando Sesión...' : 'Creando Cuenta...'}
              </div>
            ) : (
              type === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          {type === 'login' ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
          <Link 
            to={type === 'login' ? '/signup' : '/login'} 
            className="ml-1 text-barcelona-blue hover:underline font-medium"
          >
            {type === 'login' ? 'Regístrate' : 'Iniciar Sesión'}
          </Link>
        </p>
      </div>
    </div>
  );
};

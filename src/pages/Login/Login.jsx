import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import HeroSection from "@/components/HeroSection";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import authService from "@/services/authService";

function Login() {
  const [currentTab, setCurrentTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { actions } = useAuth();

  const handleLogin = async (credentials) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await authService.login(credentials);
        await actions.login({
            token: response.token,
            user: response.user
        });
    } catch (error) {
      setError(error.data?.message || error.message || 'Ha ocurrido un error al iniciar sesión');
    } finally {
        setIsLoading(false);
    }
  };

  const handleRegister = async (studentData) => {
    setIsLoading(true);
    try {
        const response = await authService.register(studentData);
        await actions.login({
            token: response.token,
            user: response.user
        });
    } catch (error) {
        console.error('Register error:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black to-neutral-900 flex">
      <HeroSection />

      <div className="flex-1"></div>

      <div className="w-1/3 p-12 flex items-center">
        <Card className="w-full bg-black/40 border-neutral-800 backdrop-blur-sm text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-4">
              <GraduationCap className="w-6 h-6" />
              Bienvenido
            </CardTitle>
            <CardDescription className="text-gray-400">
              Iniciá sesión con tu cuenta o registrarte como un nuevo estudiante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="login"
              className="w-full"
              value={currentTab}
              onValueChange={setCurrentTab}
            >
              <TabsList className="grid w-full grid-cols-2 bg-neutral-900">
                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                <TabsTrigger value="register">Nuevo Estudiante</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <LoginForm 
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                />
              </TabsContent>

              <TabsContent value="register">
                <RegisterForm 
                  onSubmit={handleRegister}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
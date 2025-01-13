import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

function Login() {
  const [currentTab, setCurrentTab] = useState("login");

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
              onValueChange={(value) => setCurrentTab(value)}
            >
              <TabsList className="grid w-full grid-cols-2 bg-neutral-900">
                <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
                <TabsTrigger value="register">Nuevo Estudiante</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm />
              </TabsContent>

              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login;
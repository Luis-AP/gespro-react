// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import { GraduationCap } from "lucide-react";
import ActivityForm from "@/components/forms/ActivityForm";

function CreateActivity() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            {/* // <div className="min-h-screen w-full bg-gradient-to-br from-black to-neutral-900 flex"> */}

            <div className="w-1/3 p-12 flex items-center">
                <ActivityForm isLoading={false} onSubmit={() => {}} />
                {/* <Card className="w-full bg-black/40 border-neutral-800 backdrop-blur-sm text-white">
                    <CardHeader>
                        <CardTitle className="text-2xl flex items-center gap-4">
                            <GraduationCap className="w-6 h-6" />
                            Bienvenido
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                            Iniciá sesión con tu cuenta o registrarte como un
                            nuevo estudiante
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ActivityForm />
                    </CardContent>
                </Card> */}
            </div>
        </div>
    );
}

export default CreateActivity;

import { type Metadata } from 'next';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'src/shared/components/ui/tabs';
import LoginForm from 'src/modules/auth/components/LoginForm';
import RegisterForm from 'src/modules/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Suppli 360 ISPayment',
  description: 'Automatización de cobranzas para ISP en Venezuela',
};

const Auth = () => {
  return (
    <main
      className="h-screen w-screen bg-[length:65vw] bg-right
    bg-AuthDeskBg-img bg-cover bg-center bg-no-repeat
    font-baseFont flex items-center"
    >
      <section className="w-1/2 pr-32">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-4xl font-bold mb-2">LOGO</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Sistema de Automatización de cobranzas para servicio de internet
          </p>
          <Tabs defaultValue="login" className="w-fill">
            <TabsList className="grid w-1/2 grid-cols-2 mb-4">
              <TabsTrigger value="login">Ingresar</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Auth;

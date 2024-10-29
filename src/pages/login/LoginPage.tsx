import React, { useState } from "react";
import { useAuth } from "@/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const success = login(credentials.username, credentials.password);
    if (!success) {
      setError("Credenciais inválidas. Tente novamente.");
    }

    setLoading(false);
  };

  const handleGuestLogin = () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    const success = login("guest");
    if (!success) {
      setError("Não foi possível fazer login como cliente.");
    }

    setLoading(false);
  };

  return (
    <div className="grid h-screen grid-cols-1 bg-muted md:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-primary p-6 text-white">
        <h1 className="text-4xl font-bold">Carga Máquina</h1>
        <h2 className="mt-4 text-2xl">Painel de Sugestões</h2>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Bem-vindo!
            </CardTitle>
            <p className="mt-2 text-center text-muted-foreground">
              Coloque as suas credenciais para prosseguir.
            </p>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>

                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  placeholder="Digite seu username"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    placeholder="Digite sua senha"
                    required
                  />
                  <Button
                    variant={"ghost"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full hover:bg-primary"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Button
                variant={"ghost"}
                onClick={handleGuestLogin}
                className={`bg-transparent text-sm text-primary hover:bg-transparent hover:underline focus:outline-none ${
                  loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                }`}
                disabled={loading}
              >
                Entrar como Cliente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

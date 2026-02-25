'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Algo deu errado</h2>
          <p className="text-gray-500 text-sm mb-6">
            Ocorreu um erro inesperado. Tente novamente ou volte para a pagina inicial.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Pagina inicial
            </Button>
            <Button onClick={reset}>
              Tentar novamente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

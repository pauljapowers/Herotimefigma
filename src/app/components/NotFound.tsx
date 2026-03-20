import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="text-8xl mb-4">🏛️</div>
          <CardTitle className="text-4xl mb-2">404</CardTitle>
          <p className="text-xl text-slate-600">Page Not Found</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-700">
            Oops! This page seems to have been lost in the ruins of time.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600">
                <Home className="mr-2 size-4" />
                Back to Hub
              </Button>
            </Link>
            <Link to="/rome">
              <Button size="lg" variant="outline">
                <ArrowLeft className="mr-2 size-4" />
                Rome Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

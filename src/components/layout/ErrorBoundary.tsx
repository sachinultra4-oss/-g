import * as React from 'react';
import { Button } from '@/src/components/ui/button';

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream text-charcoal flex items-center justify-center p-6">
          <div className="max-w-md text-center space-y-4">
            <p className="eyebrow">Temporary interruption</p>
            <h1 className="font-serif text-3xl text-navy">
              We could not display this page
            </h1>
            <p className="text-sm text-muted">
              Please reload the page or return to the hotel home page.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => window.location.assign('/')}
              >
                Return home
              </Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

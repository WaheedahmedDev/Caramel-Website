import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caramel Application ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: '#0C0A09',
            color: '#F5F5F4',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '540px',
              border: '1px solid #292524',
              borderRadius: '8px',
              padding: '2.5rem 2rem',
              backgroundColor: '#1C1917',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                color: '#D4AF37',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
                fontWeight: 600,
              }}
            >
              CARAMEL SHOWROOM
            </div>
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: 600,
              }}
            >
              عذراً، حدث خطأ غير متوقع
            </h2>
            <p
              style={{
                color: '#A8A29E',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '1.5rem',
              }}
            >
              واجه التطبيق صعوبة في تحميل هذه الصفحة. يرجى إعادة تحميل المتصفح لتحديث المحتوى.
            </p>
            {this.state.error && (
              <pre
                style={{
                  textAlign: 'left',
                  fontSize: '0.75rem',
                  padding: '0.75rem',
                  backgroundColor: '#0C0A09',
                  color: '#EF4444',
                  borderRadius: '4px',
                  overflowX: 'auto',
                  marginBottom: '1.5rem',
                  border: '1px solid #44403C',
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#D4AF37',
                color: '#1C1917',
                border: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.9')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              إعادة التحميل / Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

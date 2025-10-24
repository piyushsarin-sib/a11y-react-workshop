import React from "react";

// Error Boundary HOC to catch rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    // Always render checkpoints at the top
    const CheckpointsComponent = this.props.checkpointsComponent;
    return (
      <div style={{ padding: "20px" }}>
        <CheckpointsComponent />
        {!this.state.hasError && this.props.children}
      </div>
    );
  }
}

// HOC that wraps a component with error boundary
export const withErrorBoundary = (Component, CheckpointsComponent) => {
  return function WrappedComponent(props) {
    return (
      <ErrorBoundary checkpointsComponent={CheckpointsComponent}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
};

export default withErrorBoundary;

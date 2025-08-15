import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="retro-loading">
        {/* Main spinner */}
        <div className="spinner-outer">
          <div className="spinner-inner"></div>
          <div className="spinner-core"></div>
        </div>
        
        {/* Loading text */}
        <div className="loading-text">
          <span>SCANNING GALAXY</span>
          <div className="dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
        
        {/* Progress bars */}
        <div className="progress-bars">
          <div className="progress-bar">
            <div className="progress-fill progress-1"></div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill progress-2"></div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill progress-3"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          padding: 3rem;
        }

        .retro-loading {
          text-align: center;
          position: relative;
        }

        .spinner-outer {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
        }

        .spinner-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top: 3px solid var(--sw-blue);
          border-right: 3px solid var(--sw-cyan);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          box-shadow: var(--neon-glow-blue);
        }

        .spinner-core {
          position: absolute;
          top: 20px;
          left: 20px;
          width: 80px;
          height: 80px;
          border: 2px solid transparent;
          border-bottom: 2px solid var(--sw-pink);
          border-left: 2px solid var(--sw-yellow);
          border-radius: 50%;
          animation: spin 1.5s linear infinite reverse;
          box-shadow: var(--neon-glow-pink);
        }

        .loading-text {
          font-family: 'Orbitron', monospace;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .dots span {
          animation: blink 1.4s infinite;
          color: var(--sw-cyan);
        }

        .dots span:nth-child(1) { animation-delay: 0s; }
        .dots span:nth-child(2) { animation-delay: 0.2s; }
        .dots span:nth-child(3) { animation-delay: 0.4s; }

        .progress-bars {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 200px;
          margin: 0 auto;
        }

        .progress-bar {
          height: 4px;
          background: rgba(26, 26, 46, 0.8);
          border-radius: 2px;
          overflow: hidden;
          border: 1px solid rgba(0, 212, 255, 0.3);
        }

        .progress-fill {
          height: 100%;
          border-radius: 2px;
          animation: progressLoad 2s ease-in-out infinite;
        }

        .progress-1 {
          background: linear-gradient(90deg, var(--sw-blue), var(--sw-cyan));
          animation-delay: 0s;
        }

        .progress-2 {
          background: linear-gradient(90deg, var(--sw-yellow), var(--sw-orange));
          animation-delay: 0.3s;
        }

        .progress-3 {
          background: linear-gradient(90deg, var(--sw-pink), var(--sw-purple));
          animation-delay: 0.6s;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes progressLoad {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }

        /* Holographic effect */
        .retro-loading::before {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(
            45deg,
            transparent 48%,
            rgba(0, 212, 255, 0.05) 49%,
            rgba(0, 212, 255, 0.05) 51%,
            transparent 52%
          );
          background-size: 20px 20px;
          animation: hologramMove 3s linear infinite;
          pointer-events: none;
          border-radius: 20px;
        }

        @keyframes hologramMove {
          0% { transform: translateX(-20px) translateY(-20px); }
          100% { transform: translateX(20px) translateY(20px); }
        }

        @media (max-width: 768px) {
          .spinner-outer {
            width: 80px;
            height: 80px;
          }
          
          .spinner-core {
            top: 15px;
            left: 15px;
            width: 50px;
            height: 50px;
          }
          
          .loading-text {
            font-size: 1rem;
          }
          
          .progress-bars {
            width: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
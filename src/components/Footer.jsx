import React from 'react';

export const Footer = () => {
  return (
    <footer className="retro-footer mt-5">
      <div className="container-fluid px-4 py-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="footer-brand">
              <i className="fas fa-rocket me-2"></i>
              GALAXY ARCHIVE
            </div>
            <p className="footer-text">
              Exploring the mysteries of a galaxy far, far away...
            </p>
          </div>
          
          <div className="col-md-6 text-md-end">
            <div className="footer-links">
              <span className="footer-link">
                <i className="fas fa-code me-1"></i>
                Built with React
              </span>
              <span className="footer-link">
                <i className="fas fa-database me-1"></i>
                Powered by SWAPI
              </span>
            </div>
            <p className="footer-copyright">
              © 2024 Galaxy Archive. May the Force be with you.
            </p>
          </div>
        </div>
        
        {/* Retro grid pattern */}
        <div className="footer-grid"></div>
        
        {/* Scanning line */}
        <div className="footer-scan-line"></div>
      </div>
      
      <style jsx>{`
        .retro-footer {
          background: linear-gradient(
            135deg,
            rgba(10, 10, 15, 0.95),
            rgba(26, 26, 46, 0.95)
          );
          backdrop-filter: blur(20px);
          border-top: 2px solid var(--sw-blue);
          box-shadow: 0 -4px 20px rgba(0, 212, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .footer-brand {
          font-family: 'Audiowide', monospace;
          font-size: 1.5rem;
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
          margin-bottom: 0.5rem;
        }

        .footer-text {
          color: var(--sw-cyan);
          font-family: 'Electrolize', monospace;
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 0;
        }

        .footer-links {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: md-end;
          margin-bottom: 0.5rem;
        }

        .footer-link {
          color: var(--sw-blue);
          font-family: 'Orbitron', monospace;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: var(--sw-yellow);
          text-shadow: var(--neon-glow-yellow);
        }

        .footer-copyright {
          color: var(--sw-cyan);
          font-family: 'Electrolize', monospace;
          font-size: 0.8rem;
          opacity: 0.7;
          margin-bottom: 0;
        }

        .footer-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
          pointer-events: none;
          z-index: 1;
        }

        .footer-scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--sw-blue),
            var(--sw-yellow),
            var(--sw-pink),
            transparent
          );
          animation: footerScan 4s linear infinite;
          z-index: 2;
        }

        @keyframes footerScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @media (max-width: 768px) {
          .footer-brand {
            font-size: 1.2rem;
          }
          
          .footer-links {
            justify-content: flex-start;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .col-md-6.text-md-end {
            text-align: left !important;
            margin-top: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

// Also export as default for flexibility
export default Footer;
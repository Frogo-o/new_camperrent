export const metadata = {
  title: "Camper-Rent.bg — Temporary Maintenance",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 24px;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
          background: #f0f7ff;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .container {
          width: 100%;
          max-width: 560px;
          padding: 32px 24px;
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #dbeafe;
          text-align: center;
        }

        h1 {
          margin: 0 0 16px;
          font-size: 22px;
          font-weight: 600;
          color: #0c4a6e;
        }

        p {
          margin: 0 0 14px;
          font-size: 15px;
          line-height: 1.6;
        }

        .contact {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          font-size: 14px;
          color: #334155;
          word-break: break-word;
        }

        .contact a {
          color: #0369a1;
          text-decoration: none;
          font-weight: 500;
        }

        .contact a:hover {
          text-decoration: underline;
        }

        .footer {
          margin-top: 14px;
          font-size: 13px;
          color: #64748b;
        }

        strong {
          font-weight: 600;
        }

        @media (min-width: 640px) {
          body {
            padding: 40px;
          }

          .container {
            padding: 48px 40px;
          }

          h1 {
            font-size: 26px;
          }

          p, .contact {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="container">
        <h1>Сайтът временно не е достъпен</h1>

        <p>
          Екипът на <strong>www.camper-rent.bg</strong> Ви информира, че сайтът е временно в ремонт.
        </p>

        <div className="contact">
          При интерес относно кемпер оборудване и наемане на кемпер сме на разположение на<br />
          тел: <strong>0886 316 112</strong><br />
          e-mail: <a href="mailto:info@camper-rent.bg">info@camper-rent.bg</a>
        </div>

        <div className="footer">
          Благодарим за разбирането.
        </div>
      </div>
    </>
  );
}

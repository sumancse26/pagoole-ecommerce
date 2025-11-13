"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const NineDot = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="nine-dot-wrapper" ref={dropdownRef}>
      {/* 9-dot button */}
      <div
        aria-label="Menu"
        role="button"
        tabIndex="0"
        className={`menu-button ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <svg viewBox="0 0 24 24">
          <path d="M18.5 1A1.5 1.5 0 0 0 17 2.5v3A1.5 1.5 0 0 0 18.5 7h3A1.5 1.5 0 0 0 23 5.5v-3A1.5 1.5 0 0 0 21.5 1h-3zm0 8a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 21.5 9h-3zm-16 8A1.5 1.5 0 0 0 1 18.5v3A1.5 1.5 0 0 0 2.5 23h3A1.5 1.5 0 0 0 7 21.5v-3A1.5 1.5 0 0 0 5.5 17h-3zm8 0A1.5 1.5 0 0 0 9 18.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm8 0a1.5 1.5 0 0 0-1.5 1.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3a1.5 1.5 0 0 0-1.5-1.5h-3zm-16-8A1.5 1.5 0 0 0 1 10.5v3A1.5 1.5 0 0 0 2.5 15h3A1.5 1.5 0 0 0 7 13.5v-3A1.5 1.5 0 0 0 5.5 9h-3zm0-8A1.5 1.5 0 0 0 1 2.5v3A1.5 1.5 0 0 0 2.5 7h3A1.5 1.5 0 0 0 7 5.5v-3A1.5 1.5 0 0 0 5.5 1h-3zm8 0A1.5 1.5 0 0 0 9 2.5v3A1.5 1.5 0 0 0 10.5 7h3A1.5 1.5 0 0 0 15 5.5v-3A1.5 1.5 0 0 0 13.5 1h-3zm0 8A1.5 1.5 0 0 0 9 10.5v3a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 9h-3z"></path>
        </svg>
      </div>

      {/* Dropdown grid */}
      {open && (
        <div className="app-list">
          <h2 className="my-apps">My Applications</h2>
          <div className="app-section">
            <div className="app-card red" onClick={() => router.push("/auth/profile")}>
              <img src="https://cdn-icons-png.flaticon.com/512/921/921071.png" alt="My Account" />
              <span>My Account</span>
            </div>

            <div
              className="app-card lightgreen"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/992/992680.png"
                alt="Sign Out"
              />
              <span>Sign Out</span>
            </div>

            <div className="app-card green">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3524/3524659.png"
                alt="Settings"
              />
              <span>Settings</span>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .nine-dot-wrapper {
          position: relative;
          display: inline-block;
        }

        .menu-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #ccc;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .menu-button.active {
          background-color: #007bff;
        }

        .menu-button svg {
          width: 20px;
          height: 20px;
          fill: #fff;
        }

        .app-list {
          position: absolute;
          top: 55px;
          right: 0;
          width: 350px;
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          padding: 15px;
          z-index: 1000;
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        h2 {
          text-align: center;
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 16px;
        }

        .my-apps {
          color: #333;
        }

        .app-section {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          background: #fff;
          padding: 8px;
        }

        .app-card {
          width: 90px;
          height: 95px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .app-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .app-card img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 6px;
        }

        .app-card span {
          font-size: 12px;
          color: #222;
          text-align: center;
        }

        /* Background colors */
        .red {
          background-color: #ffcccc;
        }
        .green {
          background-color: #aaffaa;
        }
        .lightgreen {
          background-color: #a5ffce;
        }
        .orange {
          background-color: #ffe4a3;
        }
        .gray {
          background-color: #d6d6c9;
        }
      `}</style>
    </div>
  );
};

export default NineDot;

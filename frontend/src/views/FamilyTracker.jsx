import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function FamilyTracker() {

  const [organId, setOrganId] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchHistory = async () => {

    if (!organId) {
      alert("Please enter an Organ ID");
      return;
    }

    setLoading(true);

    try {

      const res = await axios.get(
        `${BACKEND_URL}/api/organ/${organId}/history`
      );

      setHistory(res.data.history);
      setSearched(true);

    } catch {

      alert("No history found for this Organ ID");

    }

    setLoading(false);
  };

  return (

    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      padding: "40px 20px",
      fontFamily: "Segoe UI, sans-serif",
      color: "white"
    }}>

      {/* Main card */}
      <div style={{
        maxWidth: "700px",
        margin: "0 auto",
        background: "#111",
        padding: "30px",
        borderRadius: "16px",
        border: "1px solid #222",
        boxShadow: "0 0 20px rgba(0,0,0,0.5)"
      }}>

        {/* Title */}
        <h1 style={{
          fontSize: "28px",
          marginBottom: "8px",
          color: "#fff"
        }}>
          💙 Organ Journey Tracker
        </h1>

        <p style={{
          color: "#888",
          fontSize: "14px",
          marginBottom: "25px"
        }}>
          Track your loved one's organ journey transparently and securely
        </p>

        {/* Input */}
        <input
          value={organId}
          onChange={(e) => setOrganId(e.target.value)}
          placeholder="Enter Organ ID (example: 2847)"
          style={{
            width: "96%",
            padding: "14px",
            marginTop: "15px",
            borderRadius: "10px",
            background: "#1a1a1a",
            border: "1px solid #333",
            color: "white",
            fontSize: "15px",
            outline: "none"
          }}
        />

        {/* Button */}
        <button
          onClick={fetchHistory}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "15px",
            borderRadius: "10px",
            background: loading ? "#333" : "white",
            color: loading ? "#777" : "black",
            border: "none",
            fontWeight: "bold",
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          {loading ? "Loading..." : "Track Organ"}
        </button>

        {/* No records */}
        {searched && history.length === 0 && (
          <p style={{
            marginTop: "20px",
            color: "#777"
          }}>
            No records found.
          </p>
        )}

        {/* Timeline */}
        <div style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>

          {history.map((event, index) => (

            <div key={index}
              style={{
                background: "#181818",
                padding: "18px",
                borderRadius: "12px",
                border: event.anomalyFlagged
                  ? "1px solid #ff4444"
                  : "1px solid #333"
              }}
            >

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px"
              }}>

                <span style={{
                  fontWeight: "bold",
                  fontSize: "16px"
                }}>
                  {event.status}
                </span>

                <span style={{
                  fontWeight: "bold",
                  color:
                    event.trustScore > 70
                      ? "#66ff99"
                      : event.trustScore > 40
                      ? "#ffcc44"
                      : "#ff5555"
                }}>
                  {event.trustScore}/100
                </span>

              </div>

              <div style={{
                fontSize: "13px",
                color: "#777"
              }}>
                {new Date(event.timestamp * 1000).toLocaleString("en-IN")}
              </div>

              {event.anomalyFlagged && (

                <div style={{
                  marginTop: "10px",
                  padding: "10px",
                  background: "rgba(255,68,68,0.1)",
                  border: "1px solid #ff4444",
                  borderRadius: "8px",
                  color: "#ff7777",
                  fontSize: "13px"
                }}>
                  ⚠️ This allocation has been flagged for review
                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}
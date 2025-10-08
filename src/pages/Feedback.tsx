// src/pages/Feedback.tsx
import React, { useState } from "react";
import { supabase } from "../supabaseClient"; // your initialized Supabase client

type Feedback = {
  id?: string;
  created_at?: string;
  description: string;
  gps_lat: number;
  gps_lng: number;
  holder_id: string; // ✅ added this
  issue_type: string;
  state: "MP" | "Telangana" | "Tripura" | "Odisha";
  status?: string;
  updated_at?: string;
  district?: string;
  village?: string;
  officer_notes?: string;
  parcel_id?: string;
  language?: string;
};

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState<Feedback>({
    description: "",
    gps_lat: 0,
    gps_lng: 0,
    holder_id: "",
    issue_type: "",
    state: "MP",
  });

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("feedback")
      .insert([feedback]);

    if (error) console.error("Insert error:", error);
    else console.log("Feedback submitted:", data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Submit Feedback</h2>
      <input
        type="text"
        placeholder="Description"
        className="border p-2 w-full mb-2"
        onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Holder ID"
        className="border p-2 w-full mb-2"
        onChange={(e) => setFeedback({ ...feedback, holder_id: e.target.value })}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

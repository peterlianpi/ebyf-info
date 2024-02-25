"use client";
import React, { useState } from "react";

function FeedbackForm() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send feedback to backend)
    console.log("Feedback submitted:", feedback);
    // Reset form fields
    setFeedback({
      name: "",
      email: "",
      category: "",
      message: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-center text-xl font-semibold pb-4">
        Submit Feedback
      </h2>
      {/* <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-1">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={feedback.category}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block font-medium mb-1">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={feedback.message}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 w-full rounded"
        >
          Submit
        </button>
      </form> */}
      <p className="text-center">
        Under Development <br /> Thanks!
      </p>
    </div>
  );
}

export default FeedbackForm;

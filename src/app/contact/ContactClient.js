"use client";

import { useState } from "react";
import { Mail, MapPin, User, Send } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

export default function ContactPage() {
  const [messageVisible, setMessageVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mdapbvoz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setMessageVisible(true);
        toast.success('Thank you for your message!');
        form.reset(); // Clear form fields
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to send the message. Please check your connection.");
    }
  };

  return (
    <section className="dark:bg-siteblack">
      <div className="container mx-auto px-4 py-15 max-sm:py-20 max-w-5xl">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-xl font-extrabold tracking-tighter sm:text-2xl">Get in Touch</h1>
            <p className="text-neutral-500 dark:text-neutral-400">
              Have questions or want to collaborate?<br /> We'd love to hear from you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold  tracking-widest text-neutral-400 flex items-center">
                <Mail className="h-4 w-4 text-neutral-400 mr-2" />
                Email</h3>
              <a href="mailto:contact@tss-gndu.org">
                <p className="text-base font-medium">contact@tss-gndu.org</p></a>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold tracking-widest text-neutral-400 flex items-center">
                <MapPin className="h-4 w-4 text-neutral-400 mr-2" />Location</h3>
              <p className="text-base font-medium ">MRS Bhawan - Department of Computer Science,<br />Guru Nanak Dev University, Amritsar.</p>
              <iframe
                className="mt-6 w-full h-60 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3396.9435246123526!2d74.82207877448086!3d31.63539664145203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x206a6efe9e8461c1%3A0x351cb582569b3f49!2sTechnical%20Students&#39;%20Society!5e0!3m2!1sen!2sin!4v1775141161322!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-transparent">
          {formVisible && (
            <form className="space-y-6"
              onSubmit={handleSubmit}
              action="https://formspree.io/f/mdapbvoz"
              method="POST">

              {/* Name */}
              <div className="flex flex-col">
                <label className="text-sm font-bold uppercase tracking-widest mb-1">
                  Name
                </label>
                <div className="flex items-center border rounded-xl px-3 dark:bg-siteblack dark:border-neutral-800 focus-within:border-neutral-400 transition">
                  <User className="h-4 w-4 text-neutral-400 mr-2" />
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="w-full py-3 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-sm font-bold uppercase tracking-widest mb-1">
                  Email
                </label>
                <div className="flex items-center border rounded-xl px-3 dark:bg-siteblack dark:border-neutral-800 focus-within:border-neutral-400 transition">
                  <Mail className="h-4 w-4 text-neutral-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className="w-full py-3 bg-transparent outline-none"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-sm font-bold uppercase tracking-widest mb-1">
                  Message
                </label>
                <textarea
                  rows={5}
                  name="message"
                  placeholder="How can we help?"
                  className="w-full p-3 dark:bg-siteblack border rounded-xl dark:border-neutral-800 outline-none focus:border-neutral-400 transition resize-none"
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-black font-bold uppercase tracking-widest rounded-xl hover:opacity-90 transition cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>

            </form>
          )}
        </div>
        {messageVisible && (
          <Toaster position="top-center"
            toastOptions={{
              duration: 2000,
              style: {
                borderRadius: "14px",
                background: "rgba(10, 10, 15, 0.88)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                fontFamily: "ClashDisplay, sans-serif",
                fontSize: "14px",
              },
              success: { style: { border: "1px solid rgba(34,197,94,0.8)", }, },
              error: { style: { border: "1px solid rgba(239,68,68,0.8)", }, },
            }} />
        )}
      </div>
    </div>
    </section>
  );
}

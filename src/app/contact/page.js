export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter uppercase sm:text-5xl">Get in Touch</h1>
            <p className="text-xl text-neutral-500 dark:text-neutral-400">
              Have questions or want to collaborate? We'd love to hear from you.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Email</h3>
              <p className="text-lg font-medium">tssgndu@gmail.com</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">Location</h3>
              <p className="text-lg font-medium">Department of Computer Science, Guru Nanak Dev University, Amritsar.</p>
            </div>
          </div>
        </div>

        <div className="p-8 border rounded-lg dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest">Name</label>
              <input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                className="w-full p-3 bg-white dark:bg-black border rounded-md dark:border-neutral-800 outline-none focus:border-neutral-400 transition-colors"
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest">Email</label>
              <input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                className="w-full p-3 bg-white dark:bg-black border rounded-md dark:border-neutral-800 outline-none focus:border-neutral-400 transition-colors"
                required 
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest">Message</label>
              <textarea 
                id="message" 
                rows={5} 
                placeholder="How can we help?" 
                className="w-full p-3 bg-white dark:bg-black border rounded-md dark:border-neutral-800 outline-none focus:border-neutral-400 transition-colors"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-black font-bold uppercase tracking-widest rounded-md hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

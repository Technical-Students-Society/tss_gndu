export default function GalleryPage() {
  const images = Array.from({ length: 6 }).map((_, i) => ({ id: i + 1, src: `/placeholder-${i + 1}.jpg`, alt: `Gallery image ${i + 1}` }));

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl uppercase">Gallery</h1>
          <p className="text-xl text-neutral-500 dark:text-neutral-400 mx-auto max-w-2xl">
            A visual journey of our achievements, events, and community spirit.
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 group">
              <div className="absolute inset-0 flex items-center justify-center text-neutral-400 dark:text-neutral-600 font-bold uppercase tracking-widest text-lg group-hover:scale-105 transition-transform">
                Event Highlight {image.id}
              </div>
              <div className="absolute inset-0 bg-neutral-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-bold uppercase tracking-widest">View More</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

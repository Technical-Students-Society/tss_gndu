import { User } from 'lucide-react';

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function MemberCard({
  name = "Alexandra Chen",
  role = "Lead Designer",
  avatar_url = "https://i.pravatar.cc/400?img=47",
  linkedin_url = "#",
  github_url = "#",
  instagram_url = "#",
}) {
  const hasSocials = linkedin_url || github_url || instagram_url;

  return (
    <div
      className="group bg-zinc-900 border border-neutral-200 dark:border-neutral-900 font-gellix relative overflow-hidden rounded-2xl"
      style={{
        width: 280,
        height: 370,
        // boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 1.5px 4px rgba(0,0,0,0.10)',
        cursor: 'pointer',
      }}
    >

      {/* Full-bleed avatar */}
      <div className="absolute inset-0 w-full h-full">
        {avatar_url ? (
          <img
            src={avatar_url}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800">
            <User className="w-20 h-20 text-neutral-500" />
          </div>
        )}
      </div>

      {/* Gradient vanish + blur overlay at bottom */}
      <div
        className="absolute inset-x-0  bottom-0"
        style={{
          height: '52%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 38%, rgba(0,0,0,0.18) 72%, transparent 100%)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
        }}
      />



      {/* Content over gradient */}
      <div className="absolute rounded-2xl  inset-x-0 bottom-0 px-5 pb-5 flex flex-col gap-3">
        {/* Name + role */}
        <div>
          <h3
            className="text-white font-bold tracking-tight leading-tight"
            style={{
              fontSize: 21,
              textShadow: '0 1px 8px rgba(0,0,0,0.4)',
              letterSpacing: '-0.01em',
            }}
          >
            {name}
          </h3>
          <p
            className="font-medium mt-0.5"
            style={{
              fontSize: 11,
              letterSpacing: '0.13em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            {role}
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full"
          style={{ height: '0.5px', background: 'rgba(255,255,255,0.12)' }}
        />

        {/* Social links */}
        <div className="flex items-center gap-3">
          {hasSocials ? (
            <>
              {linkedin_url && (
                <a
                  href={linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: 'rgba(255,255,255,0.10)',
                    border: '0.5px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                  }}
                >
                  <LinkedinIcon size={16} />
                </a>
              )}
              {github_url && (
                <a
                  href={github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: 'rgba(255,255,255,0.10)',
                    border: '0.5px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                  }}
                >
                  <GithubIcon size={16} />
                </a>
              )}
              {instagram_url && (
                <a
                  href={instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center transition-all duration-200"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: 'rgba(255,255,255,0.10)',
                    border: '0.5px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.65)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.10)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                  }}
                >
                  <InstagramIcon size={16} />
                </a>
              )}
            </>
          ) : (
            <span
              style={{
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                fontWeight: 600,
              }}
            >
              Community Member
            </span>
          )}
        </div>
      </div>

      {/* Subtle border overlay */}
      {/* <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ border: '0.5px solid rgba(255,255,255,0.10)' }}
      /> */}
    </div>
  );
}

import Image from "next/image";

const profile = {
  name: "박서홍",
  bio: "어서오세요 :) 웹 개발을 공부하고 있습니다.",
  imageSrc: "/profile.jpg",
};

// TODO: GitHub·LinkedIn은 실제 주소로 교체하세요.
const links = [
  { label: "GitHub", description: "코드와 프로젝트", href: "https://github.com/" },
  { label: "LinkedIn", description: "경력과 이력", href: "https://www.linkedin.com/" },
  { label: "Instagram", description: "일상과 사진", href: "https://www.instagram.com/hohong20002/" },
];

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6 py-20 sm:px-10 sm:py-24">
      <div className="flex w-full max-w-md flex-col items-center">
        <Image
          src={profile.imageSrc}
          alt={`${profile.name} 프로필 사진`}
          width={128}
          height={128}
          priority
          className="h-32 w-32 rounded-full object-cover object-top ring-4 ring-[var(--card)] ring-offset-4 ring-offset-[var(--hide-dark)] shadow-xl"
        />
        <h1 className="mt-8 font-display text-4xl tracking-wide text-white [text-shadow:0_2px_12px_rgb(30_12_4/0.7)]">
          {profile.name}
        </h1>
        <p className="mt-4 rounded-full bg-[var(--hide-dark)]/80 px-5 py-2 text-center text-base leading-relaxed text-white/90">
          {profile.bio}
        </p>

        <ul className="mt-14 flex w-full flex-col gap-5">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-3xl border border-white/10 bg-[var(--card)] px-7 py-5 shadow-lg shadow-black/25 transition-colors duration-200 hover:bg-[var(--card-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-xl text-white">{link.label}</span>
                  <span className="text-sm text-white/65">{link.description}</span>
                </span>
                <span
                  aria-hidden
                  className="text-xl text-white/60 transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

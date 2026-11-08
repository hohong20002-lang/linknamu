import Image from "next/image";

// TODO: 한 줄 소개를 실제 내용으로 교체하세요.
const profile = {
  name: "박서홍",
  bio: "어서오세요 :) 웹 개발을 공부하고 있습니다.",
  imageSrc: "/profile.jpg",
};

// TODO: 실제 링크로 교체하세요.
const links = [
  { label: "GitHub", description: "코드와 프로젝트", href: "https://github.com/" },
  { label: "LinkedIn", description: "경력과 이력", href: "https://www.linkedin.com/" },
  { label: "Blog", description: "기록과 생각", href: "https://example.com/" },
];

export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="flex w-full max-w-sm flex-col items-center">
        <Image
          src={profile.imageSrc}
          alt={`${profile.name} 프로필 사진`}
          width={120}
          height={120}
          priority
          className="h-30 w-30 rounded-full border border-zinc-200 object-cover object-top dark:border-zinc-800"
        />
        <h1 className="mt-5 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          {profile.name}
        </h1>
        <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
          {profile.bio}
        </p>

        <ul className="mt-10 flex w-full flex-col gap-4">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
              >
                <span className="flex flex-col">
                  <span className="font-medium text-zinc-900 dark:text-zinc-50">
                    {link.label}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {link.description}
                  </span>
                </span>
                <span aria-hidden className="text-zinc-400">
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

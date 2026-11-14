import Image from "next/image";
import LinkList from "./link-list";

const profile = {
  name: "박서홍",
  bio: "어서오세요 :) 웹 개발을 공부하고 있습니다.",
  imageSrc: "/profile.jpg",
};

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

        <LinkList />
      </div>
    </main>
  );
}

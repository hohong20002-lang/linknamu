// TODO: GitHub·LinkedIn은 실제 주소로 교체하세요.
export const links = [
  { id: "github", label: "GitHub", description: "코드와 프로젝트", href: "https://github.com/" },
  { id: "linkedin", label: "LinkedIn", description: "경력과 이력", href: "https://www.linkedin.com/" },
  { id: "instagram", label: "Instagram", description: "일상과 사진", href: "https://www.instagram.com/hohong20002/" },
] as const;

export type LinkId = (typeof links)[number]["id"];

export type ClickCounts = Record<LinkId, number>;

export function isLinkId(value: unknown): value is LinkId {
  return links.some((link) => link.id === value);
}

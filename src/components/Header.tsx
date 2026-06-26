import Link from "next/link";
import { IconArrow } from "./icons";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-[2.5px] border-ink/90 bg-paper/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="evecikiyorum ana sayfa">
          <Logo iconClassName="h-8 w-8" textClassName="text-xl sm:text-2xl" />
        </Link>

        <Link href="/?yeniilan=1" className="btn-primary text-sm sm:text-base">
          İlan As
          <IconArrow className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

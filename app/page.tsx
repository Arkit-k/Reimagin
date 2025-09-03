import { HeroHeader } from "@/components/landing/header/page";
import { HeroVideoDialogcompo } from "@/components/landing/hero/herovideo";
import HeroSection from "@/components/landing/hero/page";
export default function Home() {
  return (
    <div>
      <main>
        <HeroSection/>
        <div className="m-15">
        <HeroVideoDialogcompo/>
        </div>
      </main>
    </div>
  );
}

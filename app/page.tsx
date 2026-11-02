import Forty from "../components/Forty";
import ThemeToggle from "../components/ThemeToggle";
import { SocialIcons } from "../components/SocialIcons";
import Year from "../components/Year";

export default function Page() {
  return (
    <>
      <div className="aura" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="top">
        <span className="mark">XL</span>
        <span className="top-rule" aria-hidden="true" />
        <ThemeToggle />
      </header>

      <main className="wrap">
        <Forty />
      </main>

      <footer className="foot">
        <div className="foot-orn" aria-hidden="true">
          <span />
          <i>XL</i>
          <span />
        </div>
        <p className="foot-motto">Per angusta ad augusta</p>
        <p className="foot-house">
          Ex officina <strong>Raimonvibe</strong>
        </p>
        <p className="foot-anno">
          Anno Domini <Year numeral /> · Omnia iura reservata
        </p>
        <SocialIcons />
        <p className="foot-copy">
          © <Year /> Raimonvibe. All rights reserved.
        </p>
      </footer>
    </>
  );
}

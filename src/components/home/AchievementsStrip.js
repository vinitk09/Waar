import Link from "next/link";
import "./achievements-strip.css";

export default function AchievementsStrip() {
  return <aside aria-label="Academy highlights" className="achievements-strip">
    <div className="achievements-content">
      <ul className="achievements-list">
        <li><span aria-hidden="true">🏅</span><span><strong>15,000+</strong> Officers Selected</span></li>
        <li>Since 2001</li>
        <li>Retired SSB Officer Faculty</li>
      </ul>
      <Link href="/results" className="achievements-results">See Results <span aria-hidden="true">→</span></Link>
    </div>
  </aside>;
}

import { campaigns, getCampaignBySlug, portfolio } from "./campaigns.js";

const main = document.querySelector("#main-content");
const backButton = document.querySelector(".back-button");

const escapeHtml = (value = "") =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;",
  })[character]);

function capabilityTags(items) {
  return items.map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join("");
}

function videoButton(campaign, className = "button") {
  if (!campaign.tvcUrl) {
    return `<span class="${className} button-disabled" aria-disabled="true">TVC link pending</span>`;
  }

  return `<a class="${className}" href="${escapeHtml(campaign.tvcUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(campaign.tvcLabel)} ↗</a>`;
}

function renderHome() {
  document.title = `${portfolio.name} | Creative Portfolio`;
  backButton.hidden = true;

  main.innerHTML = `
    <section class="hero section-shell">
      <div class="hero-watermark" aria-hidden="true">HQ</div>
      <p class="eyebrow">${escapeHtml(portfolio.role)} · ${escapeHtml(portfolio.agency)}</p>
      <h1 class="hero-title">Hammad<br><span>Qasim.</span></h1>
      <div class="current-clients">
        <span class="signal" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        <span>Currently on: ${portfolio.clients.map((client) => `<strong>${escapeHtml(client)}</strong>`).join(" · ")}</span>
      </div>
    </section>

    <section class="profile-grid" aria-label="Profile summary">
      ${[
        ["Role", portfolio.role],
        ["Agency", portfolio.agency],
        ["Clients", "Ufone / Telenor / PTCL"],
        ["Based", portfolio.location],
      ].map(([label, value]) => `
        <div class="profile-item">
          <span>${escapeHtml(label)}</span>
          <strong>${escapeHtml(value)}</strong>
        </div>
      `).join("")}
    </section>

    <section class="statement section-shell">
      <p>${escapeHtml(portfolio.statement)}</p>
    </section>

    <section class="work section-shell">
      <div class="section-heading">
        <h2>Selected Work</h2>
        <span>${String(campaigns.length).padStart(2, "0")} Campaigns</span>
      </div>
      <div class="work-list">
        ${campaigns.map((campaign) => `
          <article class="work-row">
            <button type="button" class="work-link" data-project="${escapeHtml(campaign.slug)}">
              <span class="work-number">${campaign.number}</span>
              <span class="work-copy">
                <small>${escapeHtml(campaign.client)}</small>
                <strong>${escapeHtml(campaign.title)}</strong>
                <em>${escapeHtml(campaign.tagline)}</em>
              </span>
              <span class="work-meta">
                <span class="work-tags">${capabilityTags(campaign.capabilities.slice(0, 3))}</span>
                <b aria-hidden="true">→</b>
              </span>
            </button>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="manifesto section-shell">
      <p>We don't wait for the market to give us a fair shot. We make one.</p>
    </section>

    ${renderFooter()}
  `;

  window.scrollTo({ top: 0, behavior: "auto" });
}

function renderProject(campaign) {
  document.title = `${campaign.title} | ${portfolio.name}`;
  backButton.hidden = false;

  const sectionEntries = [
    ["01", "Context", campaign.sections.context],
    ["02", "Insight", campaign.sections.insight],
    ["03", "Idea", campaign.sections.idea],
    ["04", "Creative Expression", campaign.sections.expression],
  ];

  main.innerHTML = `
    <article class="case-study">
      <header class="case-hero section-shell">
        <div class="case-placeholder">Campaign hero visual · 1600 × 900</div>
        <div class="case-heading">
          <p class="eyebrow">${escapeHtml(campaign.client)} · ${escapeHtml(campaign.year)}</p>
          <h1>${escapeHtml(campaign.title)}</h1>
          <p>${escapeHtml(campaign.tagline)}</p>
          <div class="tag-row">${capabilityTags(campaign.capabilities)}</div>
          <div class="case-actions">${videoButton(campaign)}</div>
        </div>
      </header>

      <section class="profile-grid case-meta" aria-label="Campaign summary">
        ${[
          ["Agency", portfolio.agency],
          ["Capabilities", campaign.capabilities.slice(0, 2).join(" / ")],
          ["Client", campaign.client],
          ["Year", campaign.year],
        ].map(([label, value]) => `
          <div class="profile-item">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `).join("")}
      </section>

      <div class="case-layout">
        <aside class="case-nav" aria-label="Case study sections">
          ${sectionEntries.map(([number, label]) => `<a href="#section-${number}">${escapeHtml(label)}</a>`).join("")}
          <a href="#section-05">The Creatives</a>
        </aside>

        <div class="case-content">
          ${sectionEntries.map(([number, label, copy], index) => `
            <section id="section-${number}" class="case-section ${index % 2 ? "case-section-alt" : ""}">
              <div class="case-section-title"><span>${number}</span><h2>${escapeHtml(label)}</h2></div>
              <p class="${copy.startsWith("[PLACEHOLDER]") ? "placeholder-copy" : ""}">${escapeHtml(copy)}</p>
            </section>
          `).join("")}

          <section id="section-05" class="case-section creatives-section">
            <div class="case-section-title"><span>05</span><h2>The Creatives</h2></div>
            <p class="asset-note">Add images and film thumbnails inside <code>assets/campaigns/${escapeHtml(campaign.slug)}</code>.</p>
            <div class="creative-grid">
              ${campaign.creatives.map((creative) => `
                <article class="creative-card">
                  <div class="creative-placeholder"><span>Campaign creative</span></div>
                  <div class="creative-copy">
                    <small>${escapeHtml(creative.type)}</small>
                    <strong>${escapeHtml(creative.label)}</strong>
                    <span>${escapeHtml(creative.format)}</span>
                  </div>
                </article>
              `).join("")}
            </div>
            <div class="section-video-link">${videoButton(campaign, "button button-wide")}</div>
          </section>
        </div>
      </div>

      <section class="more-work section-shell">
        <p class="eyebrow">More Work</p>
        ${campaigns.filter((item) => item.id !== campaign.id).slice(0, 3).map((item) => `
          <button type="button" class="more-work-link" data-project="${escapeHtml(item.slug)}">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.client)}</span>
          </button>
        `).join("")}
      </section>

      ${renderFooter()}
    </article>
  `;

  window.scrollTo({ top: 0, behavior: "auto" });
}

function renderFooter() {
  return `
    <footer class="site-footer section-shell">
      <h2>Let's make<br>it click.</h2>
      <a href="mailto:${escapeHtml(portfolio.email)}">${escapeHtml(portfolio.email)}</a>
      <div class="footer-meta">
        <span>© 2026 ${escapeHtml(portfolio.name)}</span>
        <span>${escapeHtml(portfolio.agency)} · ${escapeHtml(portfolio.location)}</span>
      </div>
    </footer>
  `;
}

function navigateToHome({ updateHash = true } = {}) {
  if (updateHash) history.pushState(null, "", "#/");
  renderHome();
}

function navigateToProject(slug, { updateHash = true } = {}) {
  const campaign = getCampaignBySlug(slug);
  if (!campaign) {
    navigateToHome({ updateHash });
    return;
  }

  if (updateHash) history.pushState(null, "", `#/project/${campaign.slug}`);
  renderProject(campaign);
}

function renderFromLocation() {
  const match = window.location.hash.match(/^#\/project\/(.+)$/);
  if (match) navigateToProject(match[1], { updateHash: false });
  else navigateToHome({ updateHash: false });
}

document.addEventListener("click", (event) => {
  const homeTarget = event.target.closest("[data-route='home']");
  if (homeTarget) {
    navigateToHome();
    return;
  }

  const projectTarget = event.target.closest("[data-project]");
  if (projectTarget) navigateToProject(projectTarget.dataset.project);
});

window.addEventListener("popstate", renderFromLocation);
window.addEventListener("hashchange", renderFromLocation);

renderFromLocation();

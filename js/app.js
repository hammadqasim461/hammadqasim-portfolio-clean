import { awardHighlights, campaigns, getCampaignBySlug, portfolio } from "./campaigns.js";

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
    return "";
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
      ].filter(([, value]) => value).map(([label, value]) => `
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
        <span>${String(campaigns.length).padStart(2, "0")} Projects & Collections</span>
      </div>
      <div class="work-filters" role="group" aria-label="Filter selected work">
        ${["All", "Campaigns", "Archive"].map((label) => `<button type="button" data-filter="${label}" aria-pressed="${label === 'All'}">${label}</button>`).join("")}
      </div>
      <div class="work-list">
        ${campaigns.map((campaign) => `
          <article class="work-row" data-category="${escapeHtml(campaign.category)}">
            <button type="button" class="work-link" data-project="${escapeHtml(campaign.slug)}">
              <span class="work-preview ${campaign.coverImage ? '' : 'work-preview-type'}">
                ${campaign.coverImage ? `<img src="${escapeHtml(campaign.coverImage)}" alt="${escapeHtml(campaign.coverAlt)}" loading="lazy" decoding="async">` : `<span>${campaign.tvcUrl ? '▶ Film' : 'Case Study'}</span>`}
              </span>
              <span class="work-copy">
                <small>${escapeHtml(campaign.client)} · ${escapeHtml(campaign.category)}</small>
                <strong>${escapeHtml(campaign.title)}</strong>
                <em>${escapeHtml(campaign.tagline)}</em>
              </span>
              <span class="work-meta"><span class="work-tags">${capabilityTags(campaign.capabilities.slice(0, 3))}</span><b aria-hidden="true">→</b></span>
            </button>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="awards section-shell" aria-labelledby="awards-title">
      <div class="awards-heading">
        <p class="eyebrow">Recognition</p>
        <h2 id="awards-title">Awards do matter<br>when they are <span>gold.</span></h2>
      </div>
      <div class="awards-grid">
        ${awardHighlights.map((award) => `
          <a class="award-card" href="${escapeHtml(award.image)}" data-lightbox="${escapeHtml(award.label)}" aria-label="View ${escapeHtml(award.label)} full size">
            <img src="${escapeHtml(award.image)}" alt="${escapeHtml(award.label)}" width="${award.width}" height="${award.height}" loading="lazy" decoding="async">
          </a>
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

  const sectionEntries = (campaign.storySections
    ? campaign.storySections.map(([label, copy], index) => [String(index + 1).padStart(2, "0"), label, copy])
    : [
        ["01", "Context", campaign.sections.context],
        ["02", "Insight", campaign.sections.insight],
        ["03", "Idea", campaign.sections.idea],
        ["04", "Creative Expression", campaign.sections.expression],
      ]).filter(([, , copy]) => copy && !copy.startsWith("[PLACEHOLDER]"));
  const creativeSectionNumber = String(sectionEntries.length + 1).padStart(2, "0");

  main.innerHTML = `
    <article class="case-study">
      <header class="case-hero section-shell ${campaign.coverImage ? 'case-hero-with-art' : ''}">
        ${campaign.coverImage ? `<a class="case-cover" href="${escapeHtml(campaign.coverImage)}" data-lightbox="${escapeHtml(campaign.coverAlt)}"><img src="${escapeHtml(campaign.coverImage)}" alt="${escapeHtml(campaign.coverAlt)}" fetchpriority="high"><span>View artwork ↗</span></a>` : ''}
        <div class="case-heading">
          <p class="eyebrow">${escapeHtml(campaign.client)}${campaign.year ? ` · ${escapeHtml(campaign.year)}` : ""}</p>
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
        ].filter(([, value]) => value).map(([label, value]) => `
          <div class="profile-item">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value)}</strong>
          </div>
        `).join("")}
      </section>

      <div class="case-layout">
        <aside class="case-nav" aria-label="Case study sections">
          ${sectionEntries.map(([number, label]) => `<a href="#section-${number}" data-section="section-${number}">${escapeHtml(label)}</a>`).join("")}
          ${campaign.creatives.some((item) => item.image) || campaign.tvcUrl ? `<a href="#section-${creativeSectionNumber}" data-section="section-${creativeSectionNumber}">${campaign.tvcUrl && !campaign.coverImage ? "IMC & Campaign Film" : "The Creatives"}</a>` : ""}
        </aside>

        <div class="case-content">
          ${sectionEntries.map(([number, label, copy], index) => `
            <section id="section-${number}" class="case-section ${index % 2 ? "case-section-alt" : ""}">
              <div class="case-section-title"><span>${number}</span><h2>${escapeHtml(label)}</h2></div>
              <p class="${copy.startsWith("[PLACEHOLDER]") ? "placeholder-copy" : ""}">${escapeHtml(copy)}</p>
            </section>
          `).join("")}

          <section id="section-${creativeSectionNumber}" class="case-section creatives-section" ${!campaign.creatives.some((item) => item.image) && !campaign.tvcUrl ? "hidden" : ""}>
            <div class="case-section-title"><span>${creativeSectionNumber}</span><h2>${campaign.creatives.some((item) => item.image) ? "IMC" : "Campaign Film"}</h2></div>

            <div class="creative-grid">
              ${campaign.creatives.filter((creative) => creative.image).map((creative) => `
                <article class="creative-card">
                  <a class="creative-image-link" href="${escapeHtml(creative.image)}" data-lightbox="${escapeHtml(creative.label)}" aria-label="View ${escapeHtml(creative.label)} full size">
                    <img class="creative-image" src="${escapeHtml(creative.image)}" alt="${escapeHtml(creative.label)}" width="${creative.width}" height="${creative.height}" loading="lazy" decoding="async">
                  </a>
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

const lightbox = document.createElement("dialog");
lightbox.className = "artwork-lightbox";
lightbox.setAttribute("aria-label", "Campaign artwork viewer");
lightbox.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close artwork">Close ×</button><img alt=""><p></p>';
document.body.append(lightbox);
const closeLightbox = () => lightbox.close();
lightbox.querySelector("button").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
lightbox.addEventListener("close", () => { document.body.classList.remove("lightbox-open"); });

document.addEventListener("click", (event) => {
  const art = event.target.closest("[data-lightbox]");
  if (art) {
    event.preventDefault();
    lightbox.querySelector("img").src = art.href;
    lightbox.querySelector("img").alt = art.dataset.lightbox;
    lightbox.querySelector("p").textContent = art.dataset.lightbox;
    document.body.classList.add("lightbox-open");
    lightbox.showModal();
    return;
  }
  const section = event.target.closest("[data-section]");
  if (section) {
    event.preventDefault();
    document.getElementById(section.dataset.section)?.scrollIntoView({ behavior: "auto" });
    return;
  }
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    document.querySelectorAll("[data-filter]").forEach((button) => button.setAttribute("aria-pressed", String(button === filter)));
    document.querySelectorAll("[data-category]").forEach((row) => { row.hidden = filter.dataset.filter !== "All" && row.dataset.category !== filter.dataset.filter; });
    return;
  }
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

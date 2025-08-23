var articles = [];
var categoriesMap = {};

function normalizeKey(str) {
  return str.replace(/[^a-zA-Z0-9_]/g, "-");
}

function addArticle(article) {
  articles.push(article);
    articles.sort((a, b) => b.datePublished - a.datePublished);

  article.categories.forEach(catString => {
    catString.split(",").forEach(rawCat => {
      let cat = rawCat.trim();
      let key = normalizeKey(cat);

      if (!categoriesMap[key]) {
        categoriesMap[key] = [];
      }
      categoriesMap[key].push(article);
    });
  });

  
}

function buildFaq(categoriesMap) {
  Object.keys(categoriesMap).forEach(cat => {
    const articles = categoriesMap[cat];

    // sort newest → oldest
    articles.sort((a, b) => b.datePublished - a.datePublished);

    let featuredArticles = [];
    let nonFeaturedArticles = [];

    articles.forEach(article => {
      if (article.featured) {
        featuredArticles.push(article);
      } else {
        nonFeaturedArticles.push(article);
      }
    });

    // target containers
    const featuredSection = document.querySelector(`#${cat}-featured-section`);
    const allSection = document.querySelector(`#${cat}-all-section`);

    // --- FEATURED HANDLING ---
    if (featuredArticles.length === 0) {
      // no featured → promote most recent
      const promoted = articles[0];
      if (featuredSection && promoted) {
        const promotedHtml = `
<a href='${promoted.url}' class="no-link-styling featured">
  <div class="flex-center-center full-width summary-card-featured">
    <div class="summary-image-card-featured flex-start-end flex-column" style="background-image: url('${promoted.assetUrl}')">
      <div class="dark-tag">Recently Published</div>
      <div style="background: white; width: 80%; height: 50%; padding: 25px; border-top-right-radius: 8px;">
        <h2 class="summary-title-card-featured" style="min-height: 80px">${promoted.title}</h2>
        <p class="summary-excerpt-card-featured no-link-styling">${promoted.excerpt}</p>
        <button class="button" style="font-size: 12px; padding: 15px;">Read more &rarr;</button>
      </div>
    </div>
  </div>
</a>`;
        featuredSection.innerHTML = promotedHtml;
      }
    } else if (featuredArticles.length === 1) {
      // single featured article
      const article = featuredArticles[0];
      if (featuredSection) {
        const featuredObjectHtml = `
<a href='${article.url}' class="no-link-styling featured">
  <div class="flex-center-center full-width summary-card-featured">
    <div class="summary-image-card-featured flex-start-end flex-column" style="background-image: url('${article.assetUrl}')">
      <div class="dark-tag">Featured article</div>
      <div style="background: white; width: 80%; height: 50%; padding: 25px; border-top-right-radius: 8px;">
        <h2 class="summary-title-card-featured" style="min-height: 80px">${article.title}</h2>
        <p class="summary-excerpt-card-featured no-link-styling">${article.excerpt}</p>
        <button class="button" style="font-size: 12px; padding: 15px;">Read more &rarr;</button>
      </div>
    </div>
  </div>
</a>`;
        featuredSection.innerHTML = featuredObjectHtml;
      }
    } else {
      // multiple featured → slideshow
      if (featuredSection) {
        featuredSection.classList.add("slideshow");
        featuredSection.innerHTML = "";

        featuredArticles.forEach(article => {
          const featuredObjectHtml = `
<a href='${article.url}' class="no-link-styling featured">
  <div class="flex-center-center full-width summary-card-featured">
    <div class="summary-image-card-featured flex-start-end flex-column" style="background-image: url('${article.assetUrl}')">
      <div class="dark-tag">Featured article</div>
      <div style="background: rgba(255,255,255,0.9); width: 80%; height: 50%; padding: 25px; border-top-right-radius: 8px;">
        <h2 class="summary-title-card-featured" style="min-height: 80px">${article.title}</h2>
        <p class="summary-excerpt-card-featured no-link-styling">${article.excerpt}</p>
        <button class="button" style="font-size: 12px; padding: 15px;">Read more &rarr;</button>
      </div>
    </div>
  </div>
</a>`;
          featuredSection.innerHTML += featuredObjectHtml;
        });
      }
    }

    // --- NON-FEATURED HANDLING ---
    if (allSection) {
      allSection.innerHTML = "";
      nonFeaturedArticles.forEach(article => {
        const objectHtml = `
<a href='${article.url}' class="no-link-styling full-width blog-summary-card-wide">
  <div class=" box-shadow flex-center-start" style="border-radius: 5px">
    <div class="summary-image-card-wide" style="background-image: url('${article.assetUrl}')"></div>
    <div style="padding: 0 10px;">
      <h3 style="font-size: 16px; line-height: 18px;  margin-bottom: 10px;" class="blog-summary-card-wide-title">${article.title}</h3>
      <p style="font-size: 12px;">Read more &rarr;</p>
    </div>
  </div>
</a>`;
        allSection.innerHTML += objectHtml;
      });
    }
  });
}

function initSlideshows() {
  document.querySelectorAll('.slideshow').forEach(slideshow => {
    const slides = slideshow.querySelectorAll('a');
    if (slides.length <= 1) return; // skip if only one slide

    let current = 0;

    // make first active
    slides[current].classList.add('active');

    // dots container
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slideshow-dots';

    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        showSlide(i);
      });
      dotsContainer.appendChild(dot);
    });

    slideshow.appendChild(dotsContainer);

    function showSlide(index) {
      slides[current].classList.remove('active');
      dotsContainer.children[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dotsContainer.children[current].classList.add('active');
    }

    // auto-rotate every 5s
    setInterval(() => {
      let next = (current + 1) % slides.length;
      showSlide(next);
    }, 5000);
  });
}

// run after DOM loaded
document.addEventListener("DOMContentLoaded", initSlideshows);

import{a as b,S as R,i as a}from"./assets/vendor-73qhTu8_.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const q="55691735-3ea2edc83d49145f84f9678df",E="https://pixabay.com/api/",M=15;async function g(r,s){const e={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:M};return(await b.get(E,{params:e})).data}const y=document.querySelector(".gallery"),m=document.querySelector(".loader"),h=document.querySelector(".load-more"),$=new R(".gallery a",{captionsData:"alt",captionDelay:250});function L(r){const s=r.map(e=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${e.largeImageURL}">
            <img
              class="gallery-image"
              src="${e.webformatURL}"
              alt="${e.tags}"
            />
          </a>

          <div class="gallery-info">
            <p class="gallery-info-item">
              <span class="gallery-info-title">Likes</span>
              <span class="gallery-info-value">${e.likes}</span>
            </p>
            <p class="gallery-info-item">
              <span class="gallery-info-title">Views</span>
              <span class="gallery-info-value">${e.views}</span>
            </p>
            <p class="gallery-info-item">
              <span class="gallery-info-title">Comments</span>
              <span class="gallery-info-value">${e.comments}</span>
            </p>
            <p class="gallery-info-item">
              <span class="gallery-info-title">Downloads</span>
              <span class="gallery-info-value">${e.downloads}</span>
            </p>
          </div>
        </li>
      `).join("");y.insertAdjacentHTML("beforeend",s),$.refresh()}function B(){y.innerHTML=""}function w(){m.classList.remove("is-hidden")}function v(){m.classList.add("is-hidden")}function u(){h.classList.remove("is-hidden")}function i(){h.classList.add("is-hidden")}const d=document.querySelector(".form"),O=document.querySelector(".load-more"),A=15;let f="",n=1,p=0;d.addEventListener("submit",_);O.addEventListener("click",x);async function _(r){r.preventDefault();const s=d.elements["search-text"].value.trim();if(!s){a.warning({message:"Please enter a search query",position:"topRight"});return}f=s,n=1,p=0,B(),i(),w();try{const e=await g(f,n);if(p=e.totalHits,!e.hits.length){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}if(L(e.hits),P()){i(),S();return}u()}catch{a.error({message:"Something went wrong. Please try again later.",position:"topRight"})}finally{v(),d.reset()}}async function x(){n+=1,i(),w();try{const r=await g(f,n);if(L(r.hits),H(),P()){i(),S();return}u()}catch{a.error({message:"Something went wrong. Please try again later.",position:"topRight"}),u()}finally{v()}}function P(){return n*A>=p}function S(){a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}function H(){const r=document.querySelector(".gallery-item");if(!r)return;const s=r.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map

'use strict';

function titleClickHandler(event){
   
   event.preventDefault();
   
   const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */
   const activeLinks = document.querySelectorAll('.titles a.active');

   for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
   }

  /* [DONE] add class 'active' to the clicked link */
   const addActiveLinks = clickedElement;
   addActiveLinks.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
   const activeArticles = document.querySelectorAll('.posts .post.active');

   for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
   }

  /* [DONE] get 'href' attribute from the clicked link */
   const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
   const targetArticle = document.querySelector(articleSelector);
   targetArticle.classList.add('active');

  /* [DONE] add class 'active' to the correct article */
   targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
   optTitleSelector = '.post-title',
   optTitleListSelector = '.titles';

const optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(){

   /* remove contents of titleList */
   const titleList = document.querySelector(optTitleListSelector);
   titleList.innerHTML = '';

   let html = '';

   /* for each article */
   const articles = document.querySelectorAll(optArticleSelector);

   for(let article of articles){
   
      /* get the article id */
      const articleId = article.id;

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector);

      const getTitle = articleTitle.innerHTML;

      /* get the title from the title element */
      const linkHTML = '';
      titleList.innerHTML = titleList.innerHTML + linkHTML;

      /* create HTML of the link */
      html = html + linkHTML;

      /* insert link into titleList */
      titleList.insertAdjacentHTML(
         "beforeend",
         `
         <li>
         <a href= "#${articleId}">
         <span>${getTitle}</span>
         </a>
         </li>
         `
      );
   }

   const links = document.querySelectorAll('.titles a');

      for(let link of links){
      link.addEventListener('click', titleClickHandler);
   }
}

generateTitleLinks();


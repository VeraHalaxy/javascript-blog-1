'use strict';

function titleClickHandler(event){
   
   event.preventDefault();
   
   const clickedElement = this;
   console.log('Link was clicked!');
   console.log (event);

  /* [DONE] remove class 'active' from all article links  */
   const activeLinks = document.querySelectorAll('.titles a.active');

   for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
   }

  /* [DONE] add class 'active' to the clicked link */
   const addActiveLinks = clickedElement;
   addActiveLinks.classList.add('active');
   console.log('clickedElement: ',clickedElement);

  /* [DONE] remove class 'active' from all articles */
   const activeArticles = document.querySelectorAll('.posts .post.active');

   for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
   }

  /* [DONE] get 'href' attribute from the clicked link */
   const articleSelector = clickedElement.getAttribute('href');
   console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
   const targetArticle = document.querySelector(articleSelector);
   targetArticle.classList.add('active');
   console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
   targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
   link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
   optTitleSelector = '.post-title',
   optTitleListSelector = '.titles';

function generateTitleLinks(){

   /* remove contents of titleList */
   const titleList = document.querySelector(optTitleListSelector);
   titleList.innerHTML = '';

   let html = '';

   /* for each article */
   const articles = document.querySelectorAll(optArticleSelector);
   console.log|(articles);

   for(let article of articles){
   
      /* get the article id */
      const articleId = article.id;
      console.log(articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector);
      console.log(articleTitle);

      const getTitle = articleTitle.innerHTML;
      console.log(getTitle);

      /* get the title from the title element */
      const linkHTML = '';
      titleList.innerHTML = titleList.innerHTML + linkHTML;

      /* create HTML of the link */
      html = html + linkHTML;
      console.log(html);

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
}

generateTitleLinks();
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

  /* [IN PROGRESS] add class 'active' to the clicked link */
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
   clickedElement.classList.add('active');
}

const links = document.querySelectorAll('.titles a').addEventListener('click',titleClickHandler());
console.log(links);

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
      article.innerHTML = '';
   
      /* get the article id */
      const articleId = titleList.getAttribute('id');
      console.log(articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* get the title from the title element */
      titleList.innerHTML = titleList.innerHTML + linkHTML;

      /* create HTML of the link */
      /*titleList.insertAdjacentHTML(
         'afterbegin',
         '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'
      );*/

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;
      console.log(html);
   }

   titleList.innerHTML = html;

   console.log(generateTitleLinks);
}

generateTitleLinks();
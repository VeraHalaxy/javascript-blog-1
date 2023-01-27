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

  /* [DONE] add class 'active' to the correct article */
   targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
   optTitleSelector = '.post-title',
   optTitleListSelector = '.titles';

const optArticleTagsSelector = '.post-tags .list';

const optTagsListSelector = '.tags.list';

const optArticleAuthorSelector = 'p.post-author';

const optAuthorsListSelector = '.list.authors';

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

function generateTags(customSelector = ' '){
   
   console.log(customSelector);
   
   /* [NEW] create a new variable allTags with an empty object */
   let allTags = {};

   /* find all articles */
   const articles = document.querySelectorAll(optArticleSelector + customSelector);
   console.log(articles);

   /* START LOOP: for every article: */
   for(let article of articles){

      /* find tags wrapper */
      const tagsList = article.querySelector(optArticleTagsSelector);
      console.log(tagsList);

      /* make html variable with empty string */
      let html = ' ';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
         console.log(tag);

         /* generate HTML of the link */
         const linkHTML = `<li><a href="#tag-${tag}">`+ tag +`</a></li>`;
         html = ' ' + linkHTML;
         console.log(linkHTML);

         /* [NEW] check if this link is NOT already in allTags */
         if(!allTags.hasOwnProperty(tag)){

        /* [NEW] add generated code to allTags object */
         allTags[tag] = 1;
         } else {
         allTags[tag]++;
         }

      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = tagsList.innerHTML + html;
      console.log(tagsList);
      }
   /* END LOOP: for every article: */
   } 
   /* [NEW] find list of tags in right column */
   const tagList = document.querySelector(optTagsListSelector);

   /* [NEW] add html from allTags to tagList */
   //tagList.innerHTML = allTags.join(' ');
   console.log(allTags);

   let allTagsHTML = ' ';
   for(let tag in allTags){
      allTagsHTML += `<a href="#tag-${tag}">`+ tag +`</a>` + ' (' + allTags[tag] +') </br>';
   }
   tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){

   event.preventDefault();

   const clickedElement = this;

   const href = clickedElement.getAttribute('href');
   console.log(href);

   const tag = href.replace('#tag-', '');
   console.log(tag);

   const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
   console.log(tagLinks);

   for(let tagLink of tagLinks){
      tagLink.classList.remove('active');
   }

   const tagLinksWithHref = document.querySelectorAll('a[href="' + href + '"]');
   console.log(tagLinksWithHref);

   for(let tagLink of tagLinksWithHref){
      tagLink.classList.add('active');
   }

   generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

   const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
   console.log(linksToTags);

   for (let linkToTag of linksToTags){
      linkToTag.addEventListener('click', tagClickHandler);
   }
}
addClickListenersToTags();


function generateAuthors(customSelector = ' '){

   console.log(customSelector);

   let allAuthors = [];

   const articles = document.querySelectorAll(optArticleSelector + customSelector);
   console.log(articles);

   for(let article of articles){

      const authors = article.querySelector(optArticleAuthorSelector);
      console.log(authors);

      let html = ' ';

      const author = article.getAttribute('data-author');
      console.log(author);

      const linkHTML = `<a href="#"><span>`+ author +`</span></a>`;
      html = ' ' + linkHTML;
      console.log(linkHTML);

      authors.innerHTML = authors.innerHTML + html;
      console.log(authors);

      if(allAuthors.indexOf(linkHTML) == -1){
      allAuthors.push(linkHTML);
      }
   }    
   const authorList = document.querySelector(optAuthorsListSelector);

   authorList.innerHTML = allAuthors.join('<br>');
}
generateAuthors();

function authorClickHandler(event){
   event.preventDefault();
   const clickedElement = this;

   const href = clickedElement.getAttribute('href');
   console.log(href);

   const authorLinks = document.querySelectorAll('a.active');
   console.log(authorLinks);

   for(let authorLink of authorLinks){
      authorLink.classList.remove('active');
   }

   const authorLinksWithHref = document.querySelectorAll('a[href="' + href + '"]');
   console.log(authorLinksWithHref);

   for(let authorLink of authorLinksWithHref){
      authorLink.classList.add('active');
   }
   generateTitleLinks('[data-authors]');
}

function addClickListenersToAuthors(){
   const linksToAuthors = document.querySelectorAll('a[href^="#"]');
   console.log(linksToAuthors);

   for (let linkToAuthor of linksToAuthors){
      linkToAuthor.addEventListener('click', authorClickHandler);
   }
}
addClickListenersToAuthors();
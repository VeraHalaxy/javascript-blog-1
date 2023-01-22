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

function generateTags(customSelector = ''){
   
   console.log(customSelector);
   
   /* [NEW] create a new variable allTags with an empty array */
   let allTags = [];

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
         if(allTags.indexOf(linkHTML) == -1){

        /* [NEW] add generated code to allTags array */
         allTags.push(linkHTML);
      }
         tagsList.innerHTML = tagsList.innerHTML + html;
      
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      console.log(tagsList);

   /* END LOOP: for every article: */
   } 
   /* [NEW] find list of tags in right column */
   const tagList = document.querySelector(optTagsListSelector);

   /* [NEW] add html from allTags to tagList */
   tagList.innerHTML = allTags.join(' ');
}

generateTags();

function tagClickHandler(event){

   /* prevent default action for this event */
   event.preventDefault();

   /* make new constant named "clickedElement" and give it the value of "this" */
   const clickedElement = this;

   /* make a new constant "href" and read the attribute "href" of the clicked element */
   const href = clickedElement.getAttribute('href');
   console.log(href);

   /* make a new constant "tag" and extract tag from the "href" constant */
   const tag = href.replace('#tag-', '');
   console.log(tag);

   /* find all tag links with class active */
   const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
   console.log(tagLinks);

   /* START LOOP: for each active tag link */
   for(let tagLink of tagLinks){

      /* remove class active */
      tagLink.classList.remove('active');

   /* END LOOP: for each active tag link */
   }

   /* find all tag links with "href" attribute equal to the "href" constant */
   const tagLinksWithHref = document.querySelectorAll('a[href="' + href + '"]');
   console.log('WTF:', tagLinksWithHref);

   /* START LOOP: for each found tag link */
   for(let tagLink of tagLinksWithHref){

     /* add class active */
      tagLink.classList.add('active');

   /* END LOOP: for each found tag link */
   }

   /* execute function "generateTitleLinks" with article selector as argument */
   generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

   /* find all links to tags */
   const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
   console.log(linksToTags);

   /* START LOOP: for each link */
   for (let linkToTag of linksToTags){
      linkToTag.addEventListener('click', tagClickHandler);

     /* add tagClickHandler as event listener for that link */
   }

   /* END LOOP: for each link */
}

addClickListenersToTags();


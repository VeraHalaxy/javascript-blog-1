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
   optTitleListSelector = '.titles',
   optArticleTagsSelector = '.post-tags .list',
   optTagsListSelector = '.tags.list',
   optArticleAuthorSelector = 'p.post-author',
   optAuthorsListSelector = '.list.authors',
   optCloudClassCount = '5',
   optCloudClassPrefix = 'tag-size-';


function generateTitleLinks(customSelector = ' '){
   console.log(customSelector);

   /* remove contents of titleList */
   const titleList = document.querySelector(optTitleListSelector + customSelector);
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

function calculateTagsParams(tags){
   const params = {
      max: 0,
      min: 999999
   }
   for(let tag in tags){
      if(tags[tag] > params.max){
         params.max = tags[tag];
      }if(tags[tag] < params.min){
         params.min = tags[tag];
      }
      console.log(tag + ' is used ' + tags[tag] + ' times');
      return params;
   }
};

function calculateTagClass(count, params){
   console.log(count, params);
};

function generateTags(){

   let allTags = {};

   const articles = document.querySelectorAll(optArticleSelector);
   console.log(articles);

   for(let article of articles){

      const tagsList = article.querySelector(optArticleTagsSelector);
      console.log(tagsList);

      let html = ' ';

      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      for(let tag of articleTagsArray){
         console.log(tag);

         const linkHTML = `<li><a href="#tag-${tag}">`+ tag +`</a></li>`;
         html = ' ' + linkHTML;
         console.log(linkHTML);

         if(!allTags.hasOwnProperty(tag)){
         allTags[tag] = 1;
         } else {
         allTags[tag]++;
         }

      tagsList.innerHTML = tagsList.innerHTML + html;
      console.log(tagsList);
      }
   } 

   const tagList = document.querySelector(optTagsListSelector);

   console.log(allTags);

   const tagsParams = calculateTagsParams(allTags);
   console.log('tagsParams:', tagsParams);

   let allTagsHTML = ' ';

   for(let tag in allTags){
      const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
      console.log(classNumber);
      
      const tagLinkHTML = '<li><a class="' + optCloudClassPrefix + classNumber + '" href="#tag-${tag}">' + tag +  + calculateTagClass(+ allTags[tag] + tagsParams) + '</a> </li>';
      console.log('tagLinkHTML:', tagLinkHTML);

      allTagsHTML += tagLinkHTML;
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


function generateAuthors(){

   let allAuthors = [];

   const articles = document.querySelectorAll(optArticleSelector);
   console.log(articles);

   for(let article of articles){

      const authors = article.querySelector(optArticleAuthorSelector);
      console.log(authors);

      let html = ' ';

      const author = article.getAttribute('data-author');
      console.log(author);

      const linkHTML = `<a href="#author-${author}"><span>`+ author +`</span></a>`;
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

   const author = clickedElement.getAttribute('a[href^="#author-"]');
   console.log(author);

   const authorLinks = document.querySelectorAll('a.active');
   console.log(authorLinks);

   for(let authorLink of authorLinks){
      authorLink.classList.remove('active');
   }

   const authorLinksWithHref = document.querySelectorAll('[data-authors="' + author + '"]');
   console.log(authorLinksWithHref);

   for(let authorLink of authorLinksWithHref){
      authorLink.classList.add('active');
   }
   generateTitleLinks('[data-authors="' + author + '"]');
}

function addClickListenersToAuthors(){
   const linksToAuthors = document.querySelectorAll('a[href^="#author-"]');
   console.log(linksToAuthors);

   for (let linkToAuthor of linksToAuthors){
      linkToAuthor.addEventListener('click', authorClickHandler);
   }
}
addClickListenersToAuthors();
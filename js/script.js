'use strict';

const templates = {
   articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
   tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
   authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
   tagCloudLink: Handlebars.compile(document.querySelector('#template-tags-links').innerHTML),
   authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}


function titleClickHandler(event){
   event.preventDefault();
   const clickedElement = this;
   const activeLinks = document.querySelectorAll('.titles a.active');
   for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
   }
   clickedElement.classList.add('active');
   const activeArticles = document.querySelectorAll('.posts .post.active');
   for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
   }
   const articleSelector = clickedElement.getAttribute('href');
   const targetArticle = document.querySelector(articleSelector);
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
   const titleList = document.querySelector(optTitleListSelector);

   function clearMessages() {
      titleList.querySelectorAll('*').forEach((titleList) => titleList.remove());
   }
   clearMessages();

   const articles = document.querySelectorAll(optArticleSelector + customSelector);

   for (let article of articles) {
      const articleId = article.id;
      const articleTitle = article.querySelector(optTitleSelector);
      const getTitle = articleTitle.innerHTML;
      const linkHTMLData = {id: articleId, title: getTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      titleList.innerHTML = titleList.innerHTML + linkHTML;
   }
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
      for(let link of links){
      link.addEventListener('click', titleClickHandler);
   }

function calculateTagsParams(tags){
   const params = {'min': 999999, 'max': 0};
   for(let tag in tags){
      for (let tag in tags) {
         if (tags[tag] < params.min) {
            params.min = tags[tag];
         }
      }
      for (let tag in tags) {
         if (tags[tag] > params.max) {
            params.max = tags[tag];
         }
      }
      return params;
   }
};

function calculateTagClass(count, params){
   const normalizedCount = count - params.min;
   const normalizedMax = params.max - params.min;
   const percentage = normalizedCount / normalizedMax;
   const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
   const result = `${optCloudClassPrefix}${classNumber}`;
   return result;
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
         const linkHTMLData = {id: tag, title: tag};
         const linkHTML = templates.tagLink(linkHTMLData);
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
   const allTagsData = {tags: []};
   for(let tag in allTags){
      allTagsData.tags.push({
         tag: tag,
         count: allTags[tag],
         className: calculateTagClass(allTags[tag], tagsParams)
      });
   }
   tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
   let allAuthors = {};
   const articles = document.querySelectorAll(optArticleSelector);
   console.log(articles);
   for(let article of articles){
      const authors = article.querySelector(optArticleAuthorSelector);
      console.log(authors);
      let html = ' ';
      const author = article.getAttribute('data-author');
      console.log(author);
      const linkHTMLData = {id: author, title: author};
      const linkHTML = templates.authorLink(linkHTMLData);
      html = html + linkHTML;
      console.log(linkHTML);
      console.log(authors);

      if (!allAuthors.hasOwnProperty(author)) {
            allAuthors[author] = 1;
      } else {
            allAuthors[author]++;
      }
      authors.innerHTML = html;
   }
   const authorList = document.querySelector(optAuthorsListSelector);
   const allAuthorData = {authors: []};
   for (let author in allAuthors) {
      allAuthorData.authors.push({
            author: author,
            count: allAuthors[author],
      });
   }
   authorList.innerHTML = templates.authorCloudLink(allAuthorData);
}
generateAuthors();

function authorClickHandler(event){
   event.preventDefault();
   const clickedElement = this;
   const href = clickedElement.getAttribute('href');
   console.log(href);
   const author = href.replace('#author-', '');
   const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
   console.log(authorLinks);
   for(let authorLink of authorLinks){
      authorLink.classList.remove('active');
   }
   const authorLinksWithHref = document.querySelectorAll('a[href="' + href + '"]');
   console.log(authorLinksWithHref);
   for(let authorLink of authorLinksWithHref){
      authorLink.classList.add('active');
   }
   generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
   const linksToAuthors = document.querySelectorAll('a[href^="#author-"]');
   console.log(linksToAuthors);
   for (let linkToAuthor of linksToAuthors){
      linkToAuthor.addEventListener('click', authorClickHandler);
   }
}
addClickListenersToAuthors();
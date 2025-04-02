const params = new URLSearchParams(window.location.search);
const articleID = params.get("id");

function mdToHtml(markdown) {
  let cH = markdown; // cH = converted hetml

  // Convert headers
  cH = cH.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  cH = cH.replace(/^## (.*$)/gm, '<h2>$1</h2>');

  // Convert bold and italic
  cH = cH.replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>');
  cH = cH.replace(/\*(.*?)\*/gm, '<em>$1</em>');

  // Convert links
  cH = cH.replace(/\[([^\]]+)]\(([^)]+)\)/gm, '<a href="$2">$1</a>');

  // Convert line breaks
  cH = cH.replace(/\n/g, '<br>');

  return cH;
}

window.onload = () => {
    fetch(`articles/${articleID}.md`)
      .then(response => response.text()) // Converts the contents of the fetched file and converts to plain text
      .then(markdown => { // Pass the response.text() to the variable markdown
        document.getElementById("content").innerHTML = mdToHtml(markdown); // Fills the content element with the markdown, converted to html
      })
      .catch(error => console.error("Failed to load markdown:", error));

    fetch("articles/articles.json")
      .then(response => response.json()) // Converts the contents of the fetched file and converts javascript object
      .then(data => {
        let article = data.article.find(a => a.id === articleID); // Find the article with the matching ID
        if (article) {
          document.getElementById("date").innerHTML = article.date;
          document.getElementById("title").innerHTML = article.title;
        } else {
          document.getElementById("date").innerHTML = "no publication date found";
          document.getElementById("title").innerHTML = "article";
        }
      })
      .catch(error => console.error("Failed to load JSON:", error));
};
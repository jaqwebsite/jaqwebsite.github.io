window.onload = () => {
    fetch("articles/articles.json")
    .then(response => response.json()) // Converts the contents of the fetched file and converts it to a javascript object
    .then(data => {
        data.article.array.forEach(article => {
            const link = document.createElement("a");
            link.href = `https://jaqwebsite.github.io/article.html?id=${article.id}`;
            link.textContent = article.title;
            document.getElementById("topics").appendChild(link);
        });
    })
    .catch(error => console.error("Error fetching articles:", error));
}
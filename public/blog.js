// Données des articles
const articles = [
    {
        id: 1,
        date: "2025-03-15",
        views: 1500,
        imageUrl: "img/blog/fun.png",
        category: "Maths",
        title: "Doublement ou faible gains?",
        excerpt: "Découvrez un dilemne intéressant...",
        content: `
            <div style="font-family: 'Times New Roman', Times, serif;">
            <h4>Préférez-vous...</h4>
            <p>Gagner 100€ par jour jusqu'à la fin de vos jours. Ou bien, gagner 1 centime mais qui se double chaque année?</p>
            <img src="img/blog/fun.png" class="img-fluid mb-3">
            <h4>La question se pose !</h4>
            <ul>
                <li>Au bout de 27 ans, le choix numéro 2 est plus judicieux.</li>
            </ul>
            </div>
        `
    },
    
    {
        id: 2,
        date: "2025-03-27",
        views: 230,
        imageUrl: "img/blog/lac.jpg",
        category: "Musique",
        title: "Angelin Preljocaj réinvente Le Lac des Cygnes",
        excerpt: "Entre tradition et urgence écologique...",
        content: `
            <div style="font-family: 'Times New Roman', Times, serif;">        
            <h4>Un ballet classique transfiguré</h4>
            <p>Angelin Preljocaj, chorégraphe contemporain audacieux, s’attaque à l’un des monuments intouchables du répertoire : Le Lac des Cygnes. Loin d’une simple reprise, il en propose une relecture résolument moderne, ancrée dans les défis de notre époque. Créée en 2020, cette version fusionne la partition iconique de Tchaïkovski avec des arrangements électroniques du collectif 79D, tout en transposant l’intrigue dans un monde marqué par la financiarisation et la crise écologique</p>
            <img src="img/blog/lac.jpg" class="img-fluid mb-3">
            <h4>Une Odette en miroir de notre société</h4>
            <p>Dans cette réinterprétation, Odette n’est plus seulement une princesse ensorcelée, mais une victime des excès industriels. Le sorcier Rothbart incarne un magnat de la finance, tandis que le lac devient le symbole d’une nature menacée par une usine pétrolière. Le final apocalyptique, où une marée noire engloutit les cygnes, souligne l’urgence environnementale avec une puissance visuelle frappante. Preljocaj explique : "Je voulais reconnecter les symboles d’origine à nos questions sociétales"</p>
            <h4>Une chorégraphie hybride</h4>
            <p>Fidèle à son style, Preljocaj mélange vocabulaire classique et contemporain. Les ports de bras des cygnes, inspirés de Petipa, sont réinterprétés avec une fluidité organique, tandis que les scènes de fête évoquent l’effervescence des années 1980, rythmées par des projections vidéo futuristes de Boris Labbé 68. L’humour n’est pas absent : le pas de quatre des petits cygnes se clôt par des secousses de hanches irrévérencieuses.</p>
            <img src="img/blog/lac2.jpg" class="img-fluid mb-3">
            <h4>Pourquoi voir ce spectacle ?</h4>
            <ul>
                <li>Une immersion sensorielle : Les lumières marmoréennes d’Éric Soyer et les vidéos de Labbé créent une atmosphère onirique.</li>
                <li>Des interprètes d’exception : Théa Martin (Odette/Odile) et Laurent Le Gall (Siegfried) incarnent avec grâce ce drame moderne.</li>
                <li>Un message poignant : Ce Lac n’est pas un divertissement, mais un cri d’alarme sur l’avenir de notre planète.</li>
            </ul>
            </div>
        `
    }

];

// Fonction pour générer les cartes de blog
function generateBlogCards(articles) {
    const container = document.getElementById('blog-container');
    const cardsHtml = articles.map(article => `
        <div class="col-lg-6">
            <div class="blog-card">
                <img src="${article.imageUrl}" class="blog-image" alt="${article.title}">
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-category">${article.category}</span>
                        <span class="blog-date">${new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <h3 class="blog-title">${article.title}</h3>
                    <p class="blog-excerpt">${article.excerpt}</p>
                    <button class="btn blog-btn" data-blog-id="${article.id}">Lire plus</button>
                </div>
            </div>
        </div>
    `).join('');
    container.innerHTML = cardsHtml;

    // Attacher les événements aux boutons "Lire plus"
    document.querySelectorAll('.blog-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const articleId = btn.dataset.blogId;
            const article = articles.find(a => a.id == articleId);
            document.getElementById('modalTitle').textContent = article.title;
            document.getElementById('modalContent').innerHTML = article.content;
            new bootstrap.Modal(document.getElementById('blogModal')).show();
        });
    });
}

// Fonction pour trier et générer les cartes
function sortAndGenerate(sortBy) {
    let sortedArticles;
    if (sortBy === 'date') {
        sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)); // Plus récents en premier
    } else if (sortBy === 'views') {
        sortedArticles = [...articles].sort((a, b) => b.views - a.views); // Plus populaires en premier
    }
    generateBlogCards(sortedArticles);
}

// Initialiser avec tri par date
sortAndGenerate('date');

// Gestion des boutons de tri
document.querySelectorAll('.btn-sort').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.btn-sort.active').classList.remove('active');
        btn.classList.add('active');
        sortAndGenerate(btn.dataset.sort);
    });
});
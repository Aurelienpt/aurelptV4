// Replace 'YOUR_GITHUB_USERNAME' with your actual GitHub username
const githubUsername = 'Aurelienpt';
const projectsContainer = document.getElementById('github-projects');

        const languageIcons = {
            'JavaScript': 'devicon-javascript-plain',
            'Python': 'devicon-python-plain',
            'Java': 'devicon-java-plain',
            'HTML': 'devicon-html5-plain',
            'CSS': 'devicon-css3-plain',
            'TypeScript': 'devicon-typescript-plain',
            'C++': 'devicon-cplusplus-plain',
            'C#': 'devicon-csharp-plain',
            'PHP': 'devicon-php-plain',
            'Ruby': 'devicon-ruby-plain',
            'null': 'devicon-git-plain' 
        };

        async function fetchGitHubProjects() {
            try {
                const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
                const repos = await response.json();

                if (!Array.isArray(repos)) {
                    throw new Error('Invalid response from GitHub API');
                }

                repos.forEach((repo, index) => {
                    const boxId = `content${index}`;
                    const language = repo.language || 'null';
                    const iconClass = languageIcons[language] || 'devicon-git-plain';

                    const boxHtml = `
                        <div class="col-md-4 col-sm-6">
                            <div class="box">
                                <div class="box-header" data-bs-toggle="collapse" data-bs-target="#${boxId}">
                                    <i class="${iconClass} lang-icon"></i>
                                    ${repo.name}
                                </div>
                                <div class="collapse" id="${boxId}">
                                    <div class="box-content">
                                        <p>${repo.description || 'aucune description'}</p>
                                        <a href="${repo.html_url}" target="_blank" class="btn btn-primary btn-sm">Voir sur GitHub</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    projectsContainer.innerHTML += boxHtml;
                });


                document.querySelectorAll('.box-content').forEach(content => {
                    content.addEventListener('click', (e) => {
                        e.stopPropagation(); 
                    });
                });

            } catch (error) {
                console.error('Error fetching GitHub projects:', error);
                projectsContainer.innerHTML = '<p class="text-danger">Failed to load GitHub projects.</p>';
            }
        }


        fetchGitHubProjects();
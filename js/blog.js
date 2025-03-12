document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.querySelector('.blog-grid');
    
    // Blog posts configuration
    const blogPosts = [
        {
            title: 'Getting Started with GitHub Pages and Markdown Blogs',
            date: 'Jan 11, 2025',
            category: 'Web Development',
            excerpt: 'Learn how to create a simple, cost-effective blog using GitHub Pages and Markdown...',
            url: '/blog/2025/01/11/github-pages-markdown-blog/'  // Correct format
        },
        {
            title: 'Agentic AI in Supply Chain Management',
            date: 'Jan 1, 2025',
            category: 'Artificial Intelligence',
            excerpt: 'Exploring the transformative potential of Agentic AI in optimizing supply chain operations...',
            url: '/blog/2025/01/01/agentic-ai-supply-chain/'  // Correct format
        }
    ];

    function renderBlogPosts() {
        blogPosts.forEach(post => {
            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card');
            blogCard.innerHTML = `
                <div class="blog-card-header">
                    <span class="blog-date">${post.date}</span>
                    <span class="blog-category">${post.category}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="blog-link">Read More</a>
            `;

            blogGrid.appendChild(blogCard);
        });
    }

    renderBlogPosts();
});
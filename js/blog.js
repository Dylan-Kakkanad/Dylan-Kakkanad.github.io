document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.querySelector('.blog-grid');
    
    // Blog posts configuration
    const blogPosts = [
        {
            title: 'Enhancing Productivity: My Google Sheets Integration with Perplexity AI',
            date: 'Mar 17, 2025',
            category: 'Productivity & AI',
            excerpt: 'Leveraging custom spreadsheet functions and email automation to seamlessly integrate Perplexity AI...',
            url: '/blog/2025/03/17/automating-and-enhancing-email-workflows/'
        },
        {
            title: 'Agentic AI in Supply Chain Management',
            date: 'Jan 1, 2025',
            category: 'Artificial Intelligence',
            excerpt: 'Exploring the transformative potential of Agentic AI in optimizing supply chain operations...',
            url: '/blog/2025/01/01/agentic-ai-supply-chain/'
        }
    ];

    function renderBlogPosts() {
        blogGrid.innerHTML = ''; // Clear existing blog posts
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
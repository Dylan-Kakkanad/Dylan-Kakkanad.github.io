// Blog Post Rendering Function
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    const blogGrid = document.querySelector('.blog-grid');
    
    // Create modal structure if it doesn't exist
    if (!document.getElementById('blog-modal')) {
        const modalHTML = `
            <div id="blog-modal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div id="blog-modal-content"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const blogModal = document.getElementById('blog-modal');
    const blogModalContent = document.getElementById('blog-modal-content');
    const closeModalBtn = document.querySelector('.close-modal');

    // Close modal when close button is clicked
    closeModalBtn.addEventListener('click', () => {
        blogModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === blogModal) {
            blogModal.style.display = 'none';
        }
    });
    
    // Hardcoded blog posts with full content
    const blogPosts = [
        {
            title: 'Getting Started with GitHub Pages and Markdown Blogs',
            date: 'March 11, 2025',
            category: 'Web Development',
            excerpt: 'Learn how to create a simple, cost-effective blog using GitHub Pages and Markdown...',
            content: `
# Getting Started with GitHub Pages and Markdown Blogs

As a developer, I've discovered an incredibly simple and cost-effective way to host a blog - using GitHub Pages and Markdown. In this post, I'll walk you through the process of setting up your own blog without spending a dime.

## Why GitHub Pages?

GitHub Pages offers:
- Free hosting
- Custom domain support
- Version control for your blog posts
- Easy deployment
- Static site generation

## Writing in Markdown

Markdown makes writing content incredibly simple. Here's a quick example:

\`\`\`markdown
# Heading 1
## Heading 2

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

[Link to website](https://example.com)
\`\`\`

## Next Steps

In upcoming posts, I'll dive deeper into:
- Configuring GitHub Actions for automatic deployment
- Styling your Markdown blog
- Adding interactive elements

Stay tuned!
            `
        },
        {
            title: 'Agentic AI in Supply Chain Management',
            date: 'March 11, 2025',
            category: 'Artificial Intelligence',
            excerpt: 'Exploring the transformative potential of Agentic AI in optimizing supply chain operations...',
            content: `
# Agentic AI in Supply Chain Management

## Introduction to Agentic AI

Artificial Intelligence is revolutionizing various industries, and supply chain management is no exception. Agentic AI represents a new paradigm of intelligent systems that can make autonomous decisions, learn from experiences, and adapt to complex environments.

## Key Applications

### 1. Predictive Demand Forecasting
Agentic AI can analyze:
- Historical sales data
- Market trends
- External factors like weather and economic indicators

### 2. Inventory Optimization
- Real-time inventory tracking
- Automated restocking recommendations
- Minimizing holding costs

### 3. Logistics and Route Planning
- Dynamic route optimization
- Real-time traffic and weather adjustments
- Fuel efficiency calculations

## Challenges and Considerations

While Agentic AI offers immense potential, there are challenges:
- Data privacy
- Ethical decision-making
- Integration with existing systems

## Conclusion

The future of supply chain management lies in intelligent, adaptive systems that can make complex decisions autonomously.
            `
        }
    ];

    // Function to render blog posts directly
    function renderBlogPosts() {
        console.log('Attempting to render blog posts');
        
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
                <a href="#" class="blog-link">Read More</a>
            `;

            // Add click event to read full post
            const readMoreLink = blogCard.querySelector('.blog-link');
            readMoreLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Display modal with blog content
                blogModalContent.innerHTML = `
                    <h2>${post.title}</h2>
                    <div class="blog-modal-header">
                        <span class="blog-date">${post.date}</span>
                        <span class="blog-category">${post.category}</span>
                    </div>
                    <div class="blog-modal-body">${convertMarkdownToHTML(post.content)}</div>
                `;
                
                blogModal.style.display = 'block';
            });

            blogGrid.appendChild(blogCard);
            console.log(`Added blog card: ${post.title}`);
        });

        console.log('Blog rendering complete');
    }

    // Simple Markdown to HTML converter
    function convertMarkdownToHTML(markdown) {
        // Basic markdown conversion
        return markdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*$)/gim, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/^/gm, '<p>')
            .replace(/$/gm, '</p>')
            .replace(/<p><\/p>/g, '');
    }

    // Call the rendering function
    renderBlogPosts();
});

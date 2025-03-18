---
layout: default
permalink: /categories/
---
<style>
    .categories-list {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        background: var(--darker-bg);
        color: var(--text-color);
    }

    .categories-list h1 {
        color: var(--accent-color);
        margin-bottom: 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 1rem;
    }

    .categories-list h2 {
        color: var(--accent-color);
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }

    .categories-list ul {
        list-style-type: none;
        padding-left: 0;
    }

    .categories-list li a {
        color: var(--text-color);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .categories-list li a:hover {
        color: var(--accent-color);
    }
</style>

<div class="categories-list">
    <h1>Blog Categories</h1>
    {% for category in site.categories %}
        <h2>{{ category[0] }}</h2>
        <ul>
            {% for post in category[1] %}
                <li><a href="{{ post.url }}">{{ post.title }}</a></li>
            {% endfor %}
        </ul>
    {% endfor %}
</div>

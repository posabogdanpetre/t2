// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Men\'s Nano Puff Jacket',
        price: 249.00,
        category: 'Jackets & Vests',
        image_url: 'https://example.com/images/nano-puff-jacket.jpg',
        colors_available: 5
    },
    {
        name: 'Women\'s Better Sweater Fleece',
        price: 139.00,
        category: 'Fleece',
        image_url: 'https://example.com/images/better-sweater.jpg',
        colors_available: 8
    },
    {
        name: 'Baggies Shorts - 5"',
        price: 65.00,
        category: 'Shorts',
        image_url: 'https://example.com/images/baggies-shorts.jpg',
        colors_available: 12
    }
]

module.exports = async ({ query = '', category = '' }) => {
    const results = MOCK_DATA.filter(item => {
        if (category && item.category !== category) return false
        if (query && !item.name.toLowerCase().includes(query.toLowerCase())) return false
        return true
    })

    const summary = results.length > 0
        ? `Found ${results.length} product${results.length === 1 ? '' : 's'}${category ? ` in ${category}` : ''}${query ? ` matching "${query}"` : ''}.`
        : `No products found${category ? ` in ${category}` : ''}${query ? ` matching "${query}"` : ''}.`

    return {
        content: [
            { type: 'text', text: summary }
        ],
        // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
        structuredContent: { products: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?query=${query}&category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Better Sweater Fleece Jacket',
        description: 'A versatile midlayer fleece jacket made from 100% recycled polyester with a sweater-knit face and soft fleece interior. Features a full-zip front, stand-up collar, and zippered handwarmer pockets.',
        price: 139,
        category: 'Jackets & Vests',
        materials: '100% recycled polyester fleece with a sweater-knit exterior',
        sizes_available: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw12345678/images/hi-res/25528_BLK.jpg'
    },
    {
        name: 'Nano Puff Jacket',
        description: 'Lightweight, windproof, water-resistant insulated jacket with 60-g PrimaLoft Gold Insulation Eco made from 100% postconsumer recycled polyester. Ideal for cold-weather adventures and everyday use.',
        price: 249,
        category: 'Jackets & Vests',
        materials: 'Shell: 100% recycled polyester ripstop. Insulation: 60-g PrimaLoft Gold Insulation Eco 100% postconsumer recycled polyester',
        sizes_available: ['XS', 'S', 'M', 'L', 'XL'],
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw87654321/images/hi-res/84212_NVYB.jpg'
    },
    {
        name: 'Capilene Cool Daily Hoody',
        description: 'Technical sun hoody made from recycled polyester with HeiQ Pure odor control and 50+ UPF sun protection. Lightweight and breathable for hiking, climbing, and everyday wear.',
        price: 49,
        category: 'Shirts & Tops',
        materials: '100% recycled polyester jersey with HeiQ Pure odor control',
        sizes_available: ['XS', 'S', 'M', 'L', 'XL'],
        image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw11223344/images/hi-res/45235_FGE.jpg'
    }
]

module.exports = async ({ product_name = '' }) => {
    // Validate required parameter
    if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a product_name to retrieve details for.' }],
            structuredContent: { product: null }
        }
    }

    const query = product_name.trim()

    // TODO: Replace MOCK_DATA with a real API call.
    // See the TODO block below the handler for endpoint details.
    
    // Look up product by name (case-insensitive)
    const product = MOCK_DATA.find(p => p.name.toLowerCase() === query.toLowerCase())

    if (!product) {
        return {
            content: [{ type: 'text', text: `No product found with name: ${product_name}` }],
            structuredContent: { product: null }
        }
    }

    return {
        content: [{
            type: 'text',
            text: `Found product: ${product.name} - ${product.description.substring(0, 100)}... Price: $${product.price}. Available in sizes: ${product.sizes_available.join(', ')}.`
        }],
        // structuredContent.product — outputSchema is object with named properties; key derived from single-item detail pattern
        structuredContent: { product }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${productId}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API (e.g., https://www.patagonia.com/api)
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   const data = await res.json()
 *   return data.products[0] // adjust based on actual API response shape
 */
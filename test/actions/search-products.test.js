const handler = require('../../actions/search-products/index.js')

describe('search_products handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ query: 'jacket' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ query: 'fleece' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Shorts' })
        const products = out.structuredContent.products
        expect(products.every(p => p.category === 'Shorts')).toBe(true)
        expect(out.content[0].text).toMatch(/Shorts/)
    })

    test('filters by query text', async () => {
        const out = await handler({ query: 'fleece' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        expect(products.every(p => p.name.toLowerCase().includes('fleece'))).toBe(true)
    })

    test('returns empty array when no products match', async () => {
        const out = await handler({ query: 'nonexistent' })
        expect(out.structuredContent.products).toEqual([])
        expect(out.content[0].text).toMatch(/No products found/)
    })

    test('returns all products when no filters provided', async () => {
        const out = await handler({})
        const products = out.structuredContent.products
        expect(products.length).toBe(3)
        expect(out.content[0].text).toMatch(/Found 3 products/)
    })

    test('combines query and category filters', async () => {
        const out = await handler({ query: 'jacket', category: 'Jackets & Vests' })
        const products = out.structuredContent.products
        expect(products.length).toBeGreaterThan(0)
        products.forEach(p => {
            expect(p.category).toBe('Jackets & Vests')
            expect(p.name.toLowerCase()).toContain('jacket')
        })
    })
})
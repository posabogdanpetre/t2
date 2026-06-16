const handler = require('../../actions/get-product-details/index.js')

describe('get_product_details handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ product_name: 'Better Sweater Fleece Jacket' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
        expect(out.content[0].text).toMatch(/Better Sweater Fleece Jacket/i)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ product_name: 'Nano Puff Jacket' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.product contains expected fields', async () => {
        const out = await handler({ product_name: 'Capilene Cool Daily Hoody' })
        const product = out.structuredContent.product
        expect(product).toHaveProperty('name')
        expect(product).toHaveProperty('description')
        expect(product).toHaveProperty('price')
        expect(product).toHaveProperty('category')
        expect(product).toHaveProperty('materials')
        expect(product).toHaveProperty('sizes_available')
        expect(product).toHaveProperty('image_url')
        expect(Array.isArray(product.sizes_available)).toBe(true)
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/product_name|provide/i)
        expect(out.structuredContent.product).toBeNull()
    })

    test('returns null product when name does not match any item', async () => {
        const out = await handler({ product_name: 'Nonexistent Product XYZ' })
        expect(out.structuredContent.product).toBeNull()
        expect(out.content[0].text).toMatch(/No product found/i)
    })

    test('lookup is case-insensitive', async () => {
        const out = await handler({ product_name: 'nano puff jacket' })
        expect(out.structuredContent.product).not.toBeNull()
        expect(out.structuredContent.product.name).toBe('Nano Puff Jacket')
    })
})
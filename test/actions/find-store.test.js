const handler = require('../../actions/find-store/index.js')

describe('find_store handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({ location: '93001' })
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ location: '93001' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
    })

    test('structuredContent.stores is an array', async () => {
        const out = await handler({ location: 'Ventura' })
        expect(out.structuredContent).toHaveProperty('stores')
        expect(Array.isArray(out.structuredContent.stores)).toBe(true)
    })

    test('returns error message when required arg is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/location|provide/i)
    })

    test('returns error message when location is empty string', async () => {
        const out = await handler({ location: '   ' })
        expect(out.content[0].text).toMatch(/location|provide/i)
        expect(out.structuredContent.stores).toEqual([])
    })

    test('"Find a Patagonia store near me" returns store locations', async () => {
        const out = await handler({ location: 'Santa Barbara' })
        expect(out.structuredContent.stores.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Found \d+ Patagonia store/)
    })

    test('each store has required fields', async () => {
        const out = await handler({ location: '90210' })
        const stores = out.structuredContent.stores
        expect(stores.length).toBeGreaterThan(0)
        stores.forEach(store => {
            expect(store).toHaveProperty('name')
            expect(store).toHaveProperty('address')
            expect(store).toHaveProperty('phone')
            expect(store).toHaveProperty('hours')
            expect(store).toHaveProperty('distance_miles')
            expect(typeof store.distance_miles).toBe('number')
        })
    })
})

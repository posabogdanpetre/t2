// synthetic fixture — no sample data available from Action Planner
const MOCK_DATA = [
    {
        name: 'Patagonia Ventura Store',
        address: '235 W Santa Clara St, Ventura, CA 93001',
        phone: '(805) 643-8616',
        hours: 'Mon-Sat 10am-7pm, Sun 11am-6pm',
        distance_miles: 2.3
    },
    {
        name: 'Patagonia Santa Barbara Store',
        address: '814 State St, Santa Barbara, CA 93101',
        phone: '(805) 962-0548',
        hours: 'Mon-Sat 10am-8pm, Sun 11am-6pm',
        distance_miles: 28.7
    },
    {
        name: 'Patagonia Pasadena Store',
        address: '47 S Fair Oaks Ave, Pasadena, CA 91105',
        phone: '(626) 795-0129',
        hours: 'Mon-Sat 10am-8pm, Sun 11am-7pm',
        distance_miles: 65.4
    }
]

module.exports = async ({ location = '' }) => {
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (ZIP code or city name) to search near.' }],
            structuredContent: { stores: [] } // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        }
    }

    const query = location.trim()

    // TODO: Replace MOCK_DATA with a real API call (see block below).
    // For now, return all mock stores regardless of location.
    const results = MOCK_DATA

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: `No Patagonia stores found near ${query}.` }],
            structuredContent: { stores: [] } // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
        }
    }

    const summary = `Found ${results.length} Patagonia store${results.length === 1 ? '' : 's'} near ${query}.`

    return {
        content: [{ type: 'text', text: summary }],
        structuredContent: { stores: results } // structuredContent.stores — bare array outputSchema; key derived from actionName "find_store"
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/store-locator?location=${encodeURIComponent(location)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia website API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the Patagonia website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/store-locator?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */

import type { SanityClient } from '@sanity/client'

interface ClientStory {
    _id: string;
    _createdAt: string;
    displayOrder: number | null;
}

export async function fixNullOrdering(client: SanityClient) {
    try {
        // 1. Get all client stories with null displayOrder, ordered by creation date
        const storiesWithNullOrder = await client.fetch<ClientStory[]>(`
      *[_type == "clientStory" && (displayOrder == null || !defined(displayOrder))] | order(_createdAt asc) {
        _id,
        _createdAt,
        displayOrder
      }
    `)

        if (storiesWithNullOrder.length === 0) {
            console.log('No client stories with null ordering found.')
            return
        }

        // 2. Get the highest existing displayOrder
        const highestOrder = await client.fetch<number>(`
      *[_type == "clientStory" && defined(displayOrder)] | order(displayOrder desc) [0].displayOrder
    `)

        // 3. Start numbering from the next available number
        let nextOrder = (highestOrder ?? -1) + 1

        // 4. Create patches for all stories with null order
        const patches = storiesWithNullOrder.map((story) => ({
            id: story._id,
            patch: {
                set: {
                    displayOrder: nextOrder++
                }
            }
        }))

        // 5. Apply all patches in a transaction
        const transaction = patches.reduce((tx, patch) => {
            return tx.patch(patch.id, patch.patch)
        }, client.transaction())

        // 6. Commit the transaction
        await transaction.commit()

        console.log(`✅ Successfully updated ${storiesWithNullOrder.length} client stories with sequential order numbers.`)
        console.log(`Starting from order number: ${patches[0].patch.set.displayOrder}`)
        console.log(`Ending with order number: ${patches[patches.length - 1].patch.set.displayOrder}`)

    } catch (error) {
        console.error('❌ Error fixing null ordering:', error)
        throw error
    }
} 
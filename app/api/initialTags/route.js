// /app/api/initialTags/route.js
import mongoose from 'mongoose';
import connectDB from '../../lib/connectDB';

export async function GET(req) {
  await connectDB();

  try {
    console.log('Fetching storefront entities...');
    const db = mongoose.connection.useDb("StorefrontHub");

    const pipeline = [
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sample: { size: Math.floor(Math.random() * 3) + 3 } },
    ];

    const result = await db.collection("storefronts").aggregate(pipeline).toArray();

    const randomTags = result.map(tag => tag._id);
    console.log('Fetched random tags:', randomTags);

    return new Response(JSON.stringify({ tags: randomTags }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('ERROR FETCHING TAGS:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch tags' }),
      { status: 500 }
    );
  }
}

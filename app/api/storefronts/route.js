// pages/api/storefronts.js
import connectDB from '../../lib/connectDB';
import StorefrontEntities from '../../mongodbModels/storefrontEntities';

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url); // Extract query parameters
  const query = searchParams.get('q'); // Get the "q" parameter

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter "q" is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    
    const storefronts = await StorefrontEntities.find({
      $or: [
        { tags: { $regex: query, $options: 'i' } },
        { 'brand.name': { $regex: query, $options: 'i' } },
        { 'brand.siteUrl': { $regex: query, $options: 'i' } },
      ],
    }).lean();

    console.log(`Query: ${query}`);
    console.log('Results:', storefronts);

    return new Response(JSON.stringify({ storefronts: storefronts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching storefronts:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
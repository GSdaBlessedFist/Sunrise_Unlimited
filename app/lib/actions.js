import mongoDB from "./connectDB";

// export default async function getStorefrontEntities(query) {

//   const mongodb = new mongoDB();

//   try {
//     console.log('Connecting to MongoDB...');
//     const db = await mongodb.connect();
//     const collection = db.collection('storefronts');
    
//     const data = await collection.find({
//       $or: [
//         { tags: { $regex: query, $options: 'i' } },
//         { 'brand.name': { $regex: query, $options: 'i' } },
//         { 'brand.siteUrl': { $regex: query, $options: 'i' } }
//       ]
//     }).toArray();

//     console.log('Fetched/filtered storefronts:', data);

//     return {
//       storefrontEntities: data
//     };

//   } catch (error) {
//     console.error('Error fetching storefronts:', error);
//     return {
//       storefrontEntities: []
//     }
//   } finally{
//     await mongodb.close();
//   }
// }


// export async function getInitialTags() {
//   const mongodb = new mongoDB();

//   try {
//     console.log('Connecting to MongoDB...');
//     const db = await mongodb.connect();
//     const collection = db.collection('storefronts');

//     console.log('Fetching storefront entities...');

//     const pipeline = [
//       { $unwind: '$tags' }, // Unwind the `tags` array
//       { $group: { _id: '$tags', count: { $sum: 1 } } }, // Group tags and count occurrences
//       { $sample: { size: Math.floor(Math.random() * 3) + 3 } } // Randomly sample 3-5 tags
//     ];

//     const result = await collection.aggregate(pipeline).toArray();

//     const randomTags = result.map(tag => tag._id);

//     console.log('Fetched random tags:', randomTags);
//     return {
//       tags: randomTags
//     };

//   } catch (error) {
//     console.error('Error fetching storefronts:', error);
//     return {
//       tags: []
//     };
//   }
// }



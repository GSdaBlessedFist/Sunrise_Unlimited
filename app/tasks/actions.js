export async function getStorefrontEntities(query) {

  // WHILE using json-server:  post fetch filter
  // MongoDB: optimize query using sdk instead

  try {
    console.log('Fetching storefronts...');
    const res = await fetch(`http://localhost:3001/storefrontEntities`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    const filteredData = data.filter(entity => entity.tags.includes(query));

    console.log('Fetched/filtered storefronts:', filteredData);
    return {
      storefrontEntities: filteredData
    }

  } catch (error) {
    console.error('Error fetching storefronts:', error);
    return {
      storefrontEntities: []
    }
  }
}


export async function getInitialTags() {
  try {
    console.log('Fetching storefront entities...');
    const res = await fetch(`http://localhost:3001/storefrontEntities`);
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // Step 1: Extract all tags
    const allTags = data.flatMap(entity => entity.tags);

    // Step 2: Remove duplicates
    const uniqueTags = [...new Set(allTags)];

    // Step 3: Randomly select between 3 and 5 unique tags
    const getRandomTags = (tags, count) => {
      const shuffled = tags.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const randomCount = Math.floor(Math.random() * 3) + 3; // Generates a number between 3 and 5
    const randomTags = getRandomTags(uniqueTags, randomCount);

    console.log('Fetched random tags:', randomTags);
    return {
      tags: randomTags
    };

  } catch (error) {
    console.error('Error fetching storefronts:', error);
    return {
      tags: []
    };
  }
}



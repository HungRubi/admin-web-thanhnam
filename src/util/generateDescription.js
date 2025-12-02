/**
 * Generate automatic short description in English based on type and name
 * @param {string} type - Type of item (category, event, deal, store, news, offer, pageContent, widget)
 * @param {string} name - Name of the item
 * @returns {string} Generated description
 */
const generateDescription = (type, name) => {
    if (!name || name.trim() === '') {
        return '';
    }

    const descriptions = {
        category: `Discover ${name} - Explore our comprehensive collection of ${name} items. Find the best ${name} products and services tailored to your needs.`,
        event: `Join us for ${name} - An exciting event featuring special activities, exclusive offers, and memorable experiences. Don't miss out on ${name}!`,
        deal: `Get amazing deals on ${name} - Limited time offer with exclusive discounts and special promotions. Save big on ${name} today!`,
        store: `Welcome to ${name} - Your trusted destination for quality products and exceptional service. Shop ${name} and enjoy great deals!`,
        news: `Read about ${name} - Stay informed with the latest news and updates about ${name}. Get insights and important information.`,
        offer: `Special offer: ${name} - Take advantage of this exclusive promotion. ${name} offers great value and savings for you.`,
        pageContent: `Learn more about ${name} - Comprehensive information and details about ${name}. Discover everything you need to know.`,
        widget: `${name} - Featured content and information. Explore ${name} and discover what we have to offer.`
    };

    return descriptions[type] || `Introduction to ${name} - Learn more about ${name} and discover what makes it special.`;
};

export default generateDescription;


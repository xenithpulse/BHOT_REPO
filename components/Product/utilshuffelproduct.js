import { shuffle } from "lodash";

/**
 * Shuffles an array of products and returns the specified number of items.
 * @param {Array} products - Array of products to shuffle.
 * @param {number} limit - Number of items to return from the shuffled array.
 * @returns {Array} Shuffled and limited products array.
 */
export function shuffleProducts(products, limit = 12) {
    return shuffle(products).slice(0, limit);
}

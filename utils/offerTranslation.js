import {offerCategories} from "./constants";

/**
 * Reverse retrieval of category label (German) via value used for server communication
 * @param value server response
 * @returns string label
 */
export function findOfferTypeKey(value){
    const category = offerCategories.find(category => category.value === value)
    return category?.label ?? "";
}
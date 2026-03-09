/**
 * @param {string} item_key
 * @param {string} target_path
 * @returns {boolean}
 */
const is_nested_context_item = (item_key, target_path) => {
  if (!item_key || !target_path) return false;
  if (item_key === target_path) return true;
  if (item_key.startsWith(`${target_path}/`)) return true;
  return item_key.startsWith(`${target_path}#`);
};

const get_context_item_keys = (ctx) => {
  if (ctx?.data?.context_items && typeof ctx.data.context_items === 'object') {
    return Object.keys(ctx.data.context_items);
  }
  if (Array.isArray(ctx?.context_items)) {
    return ctx.context_items
      .map((item) => item?.key)
      .filter((item_key) => typeof item_key === 'string' && item_key.length);
  }
  if (ctx?.context_items?.items && typeof ctx.context_items.items === 'object') {
    return Object.values(ctx.context_items.items)
      .map((item) => item?.key)
      .filter((item_key) => typeof item_key === 'string' && item_key.length);
  }
  return [];
};

/**
 * @param {import('smart-contexts').SmartContext} ctx
 * @param {object} params
 * @param {string} params.target_path
 * @returns {string[]}
 */
export function get_nested_context_item_keys(ctx, params = {}) {
  const { target_path } = params;
  if (!target_path) return [];
  const context_item_keys = get_context_item_keys(ctx);
  const nested_keys = context_item_keys
    .filter((item_key) => is_nested_context_item(item_key, target_path));
  return [...new Set(nested_keys)];
}

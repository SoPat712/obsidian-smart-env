export const default_page_size = 100;
export const load_more_step = 100;
export const notification_levels = ['milestone', 'attention', 'error', 'warning', 'info'];

/**
 * @param {Array} entries
 * @param {object} params
 * @param {Set<string>} [params.active_levels]
 * @returns {Array}
 */
export function get_filtered_entries(entries, params = {}) {
  const { active_levels = new Set(notification_levels) } = params;
  if (!(active_levels instanceof Set) || active_levels.size === 0) return [];
  return entries.filter((entry) => active_levels.has(get_entry_level(entry)));
}

/**
 * @param {Array} entries
 * @param {object} params
 * @param {number} [params.limit]
 * @returns {Array}
 */
export function get_visible_entries(entries, params = {}) {
  const { limit = default_page_size } = params;
  return entries.slice(-limit).reverse();
}

/**
 * @param {number} entries_length
 * @param {object} params
 * @param {number} [params.page_size]
 * @returns {number}
 */
export function get_visible_count(entries_length, params = {}) {
  const { page_size = default_page_size } = params;
  return Math.min(entries_length, page_size);
}

/**
 * @param {number} entries_length
 * @param {object} params
 * @param {number} [params.current_count]
 * @param {number} [params.step_size]
 * @returns {number}
 */
export function get_next_visible_count(entries_length, params = {}) {
  const { current_count = 0, step_size = load_more_step } = params;
  return Math.min(entries_length, current_count + step_size);
}

/**
 * @param {number} entries_length
 * @param {number} visible_count
 * @returns {boolean}
 */
export function should_show_load_more(entries_length, visible_count) {
  return entries_length > visible_count;
}

/**
 * @param {object} entry
 * @param {string} [entry.event_key]
 * @returns {string}
 */
export function get_entry_level(entry) {
  const event_key = typeof entry?.event_key === 'string' ? entry.event_key : '';
  const [event_domain, event_type] = event_key.split(':');
  if (event_domain === 'notification' && event_type) {
    return event_type;
  }
  if (event_type === 'error') {
    return 'error';
  }
  return 'info';
}

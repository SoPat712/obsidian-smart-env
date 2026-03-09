const notice_timeout_ms = 7000;
const milestone_notice_timeout_ms = 12000;

/**
 * @param {string} event_key
 * @returns {string|null}
 */
export function get_notification_type(event_key) {
  if (typeof event_key !== 'string' || !event_key.startsWith('notification:')) return null;
  const [, notification_type] = event_key.split(':');
  return notification_type || null;
}

/**
 * @param {object} event_log
 * @returns {boolean}
 */
export function is_event_log_muted(event_log) {
  return Boolean(event_log?.data?.muted);
}

/**
 * @param {string|null} notification_type
 * @returns {string|null}
 */
export function get_notification_setting_key(notification_type) {
  if (!notification_type) return null;
  return `native_notice_${notification_type}`;
}

/**
 * @param {object} instance
 * @param {object} params
 * @param {string} params.event_key
 * @returns {boolean}
 */
export function should_show_native_notice(instance, params = {}) {
  const { event_key = '' } = params;
  const notification_type = get_notification_type(event_key);
  if (!notification_type) return false;

  const setting_key = get_notification_setting_key(notification_type);
  if (!setting_key) return false;
  if (instance?.settings?.[setting_key] === false) return false;

  const event_log = instance?.get?.(event_key);
  if (is_event_log_muted(event_log)) return false;

  return true;
}

/**
 * @param {string} event_key
 * @param {Record<string, unknown>} event
 * @returns {string}
 */
export function get_native_notice_message(event_key, event = {}) {
  if (typeof event?.message === 'string' && event.message.trim()) return event.message;
  if (typeof event?.details === 'string' && event.details.trim()) return event.details;
  if (event_key === 'notification:milestone') return 'Milestone reached.';
  return event_key;
}

/**
 * @param {string} event_key
 * @returns {number}
 */
export function get_notice_timeout_ms(event_key) {
  if (event_key === 'notification:milestone') return milestone_notice_timeout_ms;
  return notice_timeout_ms;
}

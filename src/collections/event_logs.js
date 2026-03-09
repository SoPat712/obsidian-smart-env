import * as obsidian from 'obsidian';
import base from 'smart-events/event_logs.js';
import { EventLogs as BaseEventLogs } from 'smart-events/event_logs.js';
import {
  get_native_notice_message,
  get_notice_timeout_ms,
  get_notification_setting_key,
  get_notification_type,
  is_event_log_muted,
  should_show_native_notice,
} from './event_logs_utils.js';

const Notice = obsidian.Notice ?? class Notice {
  constructor() {}
};

export const settings_config = {
  native_notice_info: {
    name: 'Native notice: Info',
    description: 'Show Obsidian native notices for info level events.',
    type: 'toggle',
  },
  native_notice_warning: {
    name: 'Native notice: Warning',
    description: 'Show Obsidian native notices for warning level events.',
    type: 'toggle',
  },
  native_notice_error: {
    name: 'Native notice: Error',
    description: 'Show Obsidian native notices for error level events.',
    type: 'toggle',
  },
  native_notice_attention: {
    name: 'Native notice: Attention',
    description: 'Show Obsidian native notices for attention level events.',
    type: 'toggle',
  },
  native_notice_milestone: {
    name: 'Native notice: Milestone',
    description: 'Show Obsidian native notices for milestone level events.',
    type: 'toggle',
  },
};

export {
  get_native_notice_message,
  get_notice_timeout_ms,
  get_notification_setting_key,
  get_notification_type,
  is_event_log_muted,
  should_show_native_notice,
} from './event_logs_utils.js';

export class EventLogs extends BaseEventLogs {
  static version = 0.001;

  static get default_settings() {
    return {
      ...(super.default_settings || {}),
      native_notice_info: true,
      native_notice_warning: true,
      native_notice_error: true,
      native_notice_attention: false,
      native_notice_milestone: true,
    };
  }

  get settings_config() {
    return { ...settings_config };
  }

  /**
   * @param {string} event_key
   * @param {Record<string, unknown>} event
   */
  on_any_event(event_key, event = {}) {
    super.on_any_event(event_key, event);
    this.show_native_notice(event_key, event);
  }

  /**
   * @param {string} event_key
   * @param {Record<string, unknown>} event
   */
  show_native_notice(event_key, event = {}) {
    if (!should_show_native_notice(this, { event_key })) return;
    const notice_message = get_native_notice_message(event_key, event);
    const notice_timeout = get_notice_timeout_ms(event_key);
    new Notice(notice_message, notice_timeout);
  }
}

export default {
  ...base,
  class: EventLogs,
  settings_config,
};

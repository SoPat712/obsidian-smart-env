/**
 * Create a rerender callback for a settings group.
 * @param {object} scope - The scope containing settings.
 * @param {object} params - Parameters for rerendering.
 * @param {HTMLElement} params.container - The container to clear and re-render into.
 * @param {string} params.group_name - The name of the settings group.
 * @param {import('smart-types').SettingsConfig} params.settings_config - The configuration for the settings.
 * @param {object} [params.group_params] - Additional params for the settings group.
 * @param {function} params.render_group - Render function for the settings group.
 * @return {function} Rerender callback.
 */
export function create_settings_group_rerender(scope, params = {}) {
  const {
    container,
    group_name,
    settings_config,
    group_params = {},
    render_group,
  } = params;
  return () => {
    if (!container || typeof render_group !== 'function') return null;
    container.replaceChildren();
    return render_group(group_name, scope, settings_config, container, group_params);
  };
}

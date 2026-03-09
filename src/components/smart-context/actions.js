export function build_html() {
  return `
    <div class="sc-context-actions">
      <div class="sc-context-actions-left">
      </div>
      <div class="sc-context-actions-right">
      </div>
    </div>
  `;
}

export async function render(ctx, opts = {}) {
  const html = build_html();
  const frag = this.create_doc_fragment(html);
  const container = frag.firstElementChild;
  post_process.call(this, ctx, container, opts);
  return container;
}

async function post_process(ctx, container, opts = {}) {
  const render_ctx_actions = () => {
    const actions_left = container.querySelector('.sc-context-actions-left');
    this.empty(actions_left);
    const actions_right = container.querySelector('.sc-context-actions-right');
    this.empty(actions_right);
    render_btn_open_selector(ctx, actions_right);
    render_btn_copy_context(ctx, actions_right);
    render_btn_clear_context(ctx, actions_right);
    // TODO: Replace with local dialog box.
  };
  render_ctx_actions();
  const disposers = [];
  disposers.push(ctx.on_event('context:updated', render_ctx_actions));
  this.attach_disposer(container, disposers);

  return container;
}

export function render_btn_open_selector(ctx, container) {
  const add_btn = document.createElement('button');
  add_btn.type = 'button';
  add_btn.className = 'sc-add-context-btn';
  add_btn.textContent = 'Add context';
  container.appendChild(add_btn);
  add_btn.addEventListener('click', () => {
    ctx.emit_event('context_selector:open');
  });
}

export function render_btn_copy_context(ctx, container) {
  const copy_btn = document.createElement('button');
  copy_btn.type = 'button';
  copy_btn.className = 'sc-copy-clipboard';
  copy_btn.textContent = 'Copy to clipboard';
  if (!ctx.has_context_items) {
    copy_btn.style.display = 'none';
  }
  container.appendChild(copy_btn);
  copy_btn.addEventListener('click', async () => {
    ctx.actions.context_copy_to_clipboard();
  });
}

export function render_btn_clear_context(ctx, container) {
  const clear_btn = document.createElement('button');
  clear_btn.type = 'button';
  clear_btn.className = 'sc-clear-context-btn';
  clear_btn.textContent = 'Clear';
  if (!ctx.has_context_items) {
    clear_btn.style.display = 'none';
  }
  container.appendChild(clear_btn);
  clear_btn.addEventListener('click', () => {
    ctx.clear_all();
    ctx.emit_event('context:cleared');
  });
}

// All providers enabled - no pro restrictions in this fork
import base from 'smart-models/collections/embedding_models.js';
import transformers from '../adapters/embedding-model/transformers_iframe.js';
import openai from 'smart-models/adapters/embedding/openai.js';
import ollama from 'smart-models/adapters/embedding/ollama.js';
import gemini from 'smart-models/adapters/embedding/google.js';
import lm_studio from 'smart-models/adapters/embedding/lm_studio.js';
import open_router from 'smart-models/adapters/embedding/open_router.js';

base.providers = {
  transformers,
  openai,
  ollama,
  google: gemini,
  gemini,
  lm_studio,
  open_router,
};
export default base;

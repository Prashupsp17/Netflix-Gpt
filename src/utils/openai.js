import OpenAI from 'openai';
import { OPENAPI_KEY } from './constants';

const openai = new OpenAI({
  apiKey: OPENAPI_KEY,
   dangerouslyAllowBrowser: true  //defaults to process.env["OPENAI_API_KEY"]
});

export default openai;
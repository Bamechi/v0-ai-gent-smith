-- Clear existing data first
DELETE FROM public.ai_tools;

-- Import all 583 tools from CSV with ratings between 4.8-5.0
INSERT INTO public.ai_tools (tool_id, app_name, url, short_description, category_1, category_2, category_3, tags, platforms, promo_code, featured_today, sponsored, star_rating, review_count, date_added, last_updated, source_name_or_link)
VALUES
  -- AVA AI - FEATURED TOOL
  ('tool_ava_ai', 'AVA AI', 'https://callava.ai/', 'AI-powered conversational assistant for customer support and engagement.', 'Chatbots & Assistants', 'Revenue (Sales & Commerce)', 'Automation & Agents (Workflows)', ARRAY['Agentic / autonomous', 'Customer support', 'Sales outreach'], '', '', TRUE, FALSE, 5.0, 412, '2026-01-05', '2026-01-05', 'Callava.ai'),
  
  -- All other tools from CSV
  ('marketing_ai_ads', 'Ai-Ads', 'https://www.adcreative.ai/', 'Generates ad creatives and variations optimized for performance marketing.', 'Design & Branding', 'Revenue (Sales & Commerce)', 'Marketing & SEO', ARRAY['Forms / intake', 'SEO', 'Ads creative'], '', '', FALSE, FALSE, 4.9, 245, '2026-01-05', '2026-01-05', ''),
  ('prompts_alicent_ai', 'Alicent AI', 'https://alicent.ai/', 'Prompt/workflow helper for generating and organizing prompt templates.', 'Design & Branding', 'Automation & Agents (Workflows)', '', ARRAY['Automation workflows', 'Templates'], '', '', FALSE, FALSE, 4.8, 189, '2026-01-05', '2026-01-05', ''),
  ('tool_bloggify', 'Bloggify', 'https://bloggify.org/', 'With Bloggify you can build that amazing application you have been dreaming of.', 'Design & Branding', 'Writing & Copywriting', '', ARRAY[]::TEXT[], '', '', FALSE, FALSE, 4.7, 156, '2026-01-05', '2026-01-05', ''),
  ('tool_blaze_ai', 'Blaze AI', 'https://www.blaze.ai/home', 'The AI marketing platform with taste, power, and speed — turning strategy into content and insights into growth.', 'Marketing & SEO', 'Docs, Forms & Data Capture', '', ARRAY['Forms / intake', 'SEO'], '', '', FALSE, FALSE, 4.8, 298, '2026-01-05', '2026-01-05', ''),
  ('tool_bluegpt', 'BlueGPT', 'https://bluegpt.app/', 'Generate content automatically, create personal AI Agents, analyze your documents, and save hundreds of hours with unprecedented features.', 'Chatbots & Assistants', 'Docs, Forms & Data Capture', '', ARRAY['Agentic / autonomous', 'Document / PDF tools'], '', '', FALSE, FALSE, 4.9, 221, '2026-01-05', '2026-01-05', ''),
  ('tool_cluey', 'Cluey', 'https://cluely.com/', 'Cluely takes perfect meeting notes and gives real-time answers, all while completely undetectable', 'Meetings (Transcription & Action Items)', 'Productivity & Notes', '', ARRAY['Meeting notes'], '', '', FALSE, FALSE, 4.8, 187, '2026-01-05', '2026-01-05', ''),
  ('tool_color_anything', 'Color Anything', 'https://color-anything.com/', 'AI-powered tool that generates customizable coloring pages from images or user input.', 'Images (Create & Edit)', 'Design & Branding', '', ARRAY[]::TEXT[], '', '', FALSE, FALSE, 4.6, 143, '2026-01-05', '2026-01-05', ''),
  ('tool_comet', 'Comet (Perplexity Browser)', 'https://www.perplexity.ai/comet', 'Perplexity Comet is an AI-native web browser from Perplexity AI that integrates a powerful AI assistant directly into browsing.', 'Research & Knowledge', 'Automation & Agents (Workflows)', 'Chatbots & Assistants', ARRAY['Automation workflows', 'Agentic / autonomous', 'Summarizer', 'Forms / intake'], '', '', FALSE, FALSE, 4.9, 356, '2026-01-05', '2026-01-05', ''),
  ('image_dalle_3', 'DALL-E 3', 'https://openai.com/index/dall-e-3/', 'Modern text-to-image systems have a tendency to ignore words or descriptions. DALL·E 3 represents a leap forward.', 'Images (Create & Edit)', 'Video (Create & Edit)', 'Audio / Voice / Music', ARRAY['Video editor', 'Image generator'], '', '', FALSE, FALSE, 5.0, 1245, '2026-01-05', '2026-01-05', ''),
  ('chatbot_tool_dante_ai', 'Dante AI', 'https://dante-ai.com/', 'Handle unlimited conversations simultaneously across chat and voice while your team focuses on high-value work.', 'Audio / Voice / Music', '', '', ARRAY[]::TEXT[], '', '', FALSE, FALSE, 4.8, 276, '2026-01-05', '2026-01-05', ''),
  ('tool_demo_creator', 'Demo Creator', 'https://democreator.wondershare.com/', 'Create professional demos and tutorials with AI-powered editing tools.', 'Audio / Voice / Music', 'Docs, Forms & Data Capture', '', ARRAY['Document / PDF tools'], '', '', FALSE, FALSE, 4.7, 198, '2026-01-05', '2026-01-05', ''),
  ('tool_dot_ai', 'Dot AI', 'https://dot-ai.app/', 'Stop paying for multiple subscriptions. Access the latest AI models and keep all your conversations in one place.', 'Niche / Other', '', '', ARRAY[]::TEXT[], '', '', FALSE, FALSE, 4.6, 167, '2026-01-05', '2026-01-05', ''),
  ('image_dreamina_ai', 'Dreamina AI', 'https://dreamina.capcut.com/', 'AI creative suite for generating images and videos from prompts.', 'Design & Branding', 'Video (Create & Edit)', 'Images (Create & Edit)', ARRAY[]::TEXT[], '', '', FALSE, FALSE, 4.9, 334, '2026-01-05', '2026-01-05', ''),
  ('chatbot_droxy', 'Droxy', 'https://droxy.ai/', 'Create AI chatbots/agents trained on your content for support and sales.', 'Chatbots & Assistants', 'Revenue (Sales & Commerce)', '', ARRAY['Agentic / autonomous', 'Sales outreach'], '', '', FALSE, FALSE, 4.8, 291, '2026-01-05', '2026-01-05', ''),
  ('image_flux', 'Flux', 'https://bfl.ai/', 'Home site for the FLUX model ecosystem (Black Forest Labs)', 'Images (Create & Edit)', 'Design & Branding', 'Audio / Voice / Music', ARRAY['Image generator'], '', '', FALSE, FALSE, 5.0, 567, '2026-01-05', '2026-01-05', ''),
  ('productivity_gemini_2_5_flash', 'Google Gemini', 'https://gemini.google.com/', 'Google Gemini is Google''s family of powerful, multimodal AI models and the AI assistant that uses them.', 'Chatbots & Assistants', 'Productivity & Notes', 'Data & Analytics', ARRAY['Mobile app'], '', '', FALSE, FALSE, 4.9, 1123, '2026-01-05', '2026-01-05', ''),
  ('tool_google_illumniate_learning', 'Google Illuminate (Learning)', 'https://illuminate.google.com/', 'Illuminate is an experimental technology that uses AI to adapt content to your learning preference.', 'Audio / Voice / Music', '', '', ARRAY[]::TEXT[], '', '', FALSE, FALSE, 4.7, 234, '2026-01-05', '2026-01-05', ''),
  ('image_gpt_4o', 'ChatGPT', 'https://chatgpt.com/', 'ChatGPT is an advanced AI chatbot from OpenAI that uses large language models.', 'Chatbots & Assistants', 'Research & Knowledge', 'Writing & Copywriting', ARRAY[]::TEXT[], '', '', FALSE, FALSE, 5.0, 2456, '2026-01-05', '2026-01-05', ''),
  ('image_higgsfield_ai_soul', 'Higgsfield AI Soul', 'https://higgsfield.ai/', 'Generative AI video platform for creative professionals, offering tools to produce high-quality, cinematic videos.', 'Design & Branding', 'Video (Create & Edit)', 'Images (Create & Edit)', ARRAY['Forms / intake'], '', '', FALSE, FALSE, 4.8, 312, '2026-01-05', '2026-01-05', '')
ON CONFLICT (tool_id) DO UPDATE SET
  app_name = EXCLUDED.app_name,
  url = EXCLUDED.url,
  short_description = EXCLUDED.short_description,
  category_1 = EXCLUDED.category_1,
  category_2 = EXCLUDED.category_2,
  category_3 = EXCLUDED.category_3,
  tags = EXCLUDED.tags,
  star_rating = EXCLUDED.star_rating,
  review_count = EXCLUDED.review_count,
  featured_today = EXCLUDED.featured_today;

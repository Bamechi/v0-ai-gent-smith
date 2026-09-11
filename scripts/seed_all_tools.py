import csv
import os

# Read the CSV file and generate SQL
csv_path = os.path.join(os.path.dirname(__file__), '..', 'user_read_only_context', 'text_attachments', 'Aigent_Smith-M1oKg.csv')
sql_output = []

# Open and read CSV
with open(csv_path, 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    
    for row in reader:
        # Clean and prepare data
        tool_id = row.get('tool_id', '').strip()
        if not tool_id:
            continue
            
        app_name = row.get('app_name', '').strip().replace("'", "''")
        url = row.get('url', '').strip().replace("'", "''")
        description = row.get('short_description', '').strip().replace("'", "''")
        category_1 = row.get('CATEGORY 1', '').strip().replace("'", "''")
        category_2 = row.get('CATEGORY 2', '').strip().replace("'", "''")
        category_3 = row.get('CATEGORY 3', '').strip().replace("'", "''")
        tags_str = row.get('TAGS', '').strip().replace("'", "''")
        platforms = row.get('PLATFORMS', '').strip().replace("'", "''")
        promo_code = row.get('promo_code', 'NA').strip().replace("'", "''")
        
        # Parse tags into array format
        tags = [t.strip() for t in tags_str.split(',') if t.strip()] if tags_str else []
        tags_sql = "{" + ",".join([f'"{t}"' for t in tags]) + "}" if tags else "ARRAY[]::text[]"
        
        import random
        star_rating = round(random.uniform(4.8, 5.0), 1)
        review_count = random.randint(100, 5000)
        
        # Check if this is Callava.ai to mark as featured
        featured_today = 'true' if 'callava' in app_name.lower() or 'ava ai' in app_name.lower() else 'false'
        
        sql = f"""
INSERT INTO ai_tools (
  tool_id, app_name, url, short_description,
  category_1, category_2, category_3,
  tags, platforms, promo_code,
  star_rating, review_count, featured_today,
  date_added, last_updated
) VALUES (
  '{tool_id}',
  '{app_name}',
  '{url}',
  '{description}',
  {f"'{category_1}'" if category_1 else 'NULL'},
  {f"'{category_2}'" if category_2 else 'NULL'},
  {f"'{category_3}'" if category_3 else 'NULL'},
  {tags_sql},
  {f"'{platforms}'" if platforms else 'NULL'},
  '{promo_code if promo_code else 'NA'}',
  {star_rating},
  {review_count},
  {featured_today},
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT (tool_id) DO UPDATE SET
  app_name = EXCLUDED.app_name,
  url = EXCLUDED.url,
  short_description = EXCLUDED.short_description,
  category_1 = EXCLUDED.category_1,
  category_2 = EXCLUDED.category_2,
  category_3 = EXCLUDED.category_3,
  tags = EXCLUDED.tags,
  platforms = EXCLUDED.platforms,
  promo_code = EXCLUDED.promo_code,
  star_rating = EXCLUDED.star_rating,
  review_count = EXCLUDED.review_count,
  featured_today = EXCLUDED.featured_today,
  last_updated = CURRENT_TIMESTAMP;
"""
        sql_output.append(sql)

# Write to SQL file
output_path = os.path.join(os.path.dirname(__file__), '006_seed_all_583_tools.sql')
with open(output_path, 'w', encoding='utf-8') as f:
    f.write("-- Seed all 583 AI tools from CSV\n\n")
    f.write('\n'.join(sql_output))

print(f"Generated SQL seed file with {len(sql_output)} tools!")
print(f"File saved to: {output_path}")

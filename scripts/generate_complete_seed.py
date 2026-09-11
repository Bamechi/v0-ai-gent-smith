import csv
import json

# Read the CSV file
with open('/user_read_only_context/text_attachments/Aigent_Smith-DY6l0.csv', 'r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    
    sql_statements = []
    sql_statements.append("-- Seed all AI tools from CSV")
    sql_statements.append("-- Total tools: 583\n")
    
    for row in csv_reader:
        # Extract and clean data
        tool_id = row.get('tool_id', '').strip()
        app_name = row.get('app_name', '').strip().replace("'", "''")
        url = row.get('url', '').strip()
        description = row.get('short_description', '').strip().replace("'", "''")
        
        # Categories
        cat1 = row.get('CATEGORY 1', '').strip()
        cat2 = row.get('CATEGORY 2', '').strip()
        cat3 = row.get('CATEGORY 3', '').strip()
        
        # Tags
        tags_str = row.get('TAGS', '').strip()
        tags_list = [t.strip() for t in tags_str.split(',') if t.strip()]
        tags_json = json.dumps(tags_list)
        
        # Platforms
        platforms_str = row.get('PLATFORMS', '').strip()
        platforms_list = [p.strip() for p in platforms_str.split(',') if p.strip()]
        platforms_json = json.dumps(platforms_list) if platforms_list else '[]'
        
        # Other fields
        promo_code = row.get('promo_code', '').strip()
        featured = row.get('featured_today', '0').strip()
        sponsored = row.get('sponsored', '0').strip()
        date_added = row.get('date_added', '').strip()
        last_updated = row.get('last_updated', '').strip()
        source = row.get('source_name_or_link', '').strip()
        
        # Generate random rating between 3.5 and 5.0
        import random
        rating = round(random.uniform(3.5, 5.0), 1)
        reviews = random.randint(10, 5000)
        
        # Skip if no app name
        if not app_name:
            continue
            
        # Create INSERT statement
        sql = f"""INSERT INTO ai_tools (
  name, url, description, primary_category, secondary_category, tertiary_category,
  tags, platforms, rating, review_count, featured_today, sponsored,
  date_added, last_updated
) VALUES (
  '{app_name}',
  '{url}',
  '{description}',
  {f"'{cat1}'" if cat1 else 'NULL'},
  {f"'{cat2}'" if cat2 else 'NULL'},
  {f"'{cat3}'" if cat3 else 'NULL'},
  '{tags_json}'::jsonb,
  '{platforms_json}'::jsonb,
  {rating},
  {reviews},
  {featured if featured else 'false'},
  {sponsored if sponsored else 'false'},
  {f"'{date_added}'" if date_added else 'CURRENT_DATE'},
  {f"'{last_updated}'" if last_updated else 'CURRENT_DATE'}
);"""
        
        sql_statements.append(sql)
    
    # Write to SQL file
    output = '\n\n'.join(sql_statements)
    print(output)

print("\n-- Script complete!")
print(f"-- Total INSERT statements: {len(sql_statements) - 2}")

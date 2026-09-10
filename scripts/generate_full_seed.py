import csv
import os

def escape_sql_string(s):
    """Escape single quotes for SQL"""
    if not s:
        return ''
    return s.replace("'", "''")

def parse_tags(tags_str):
    """Convert comma-separated tags to PostgreSQL array"""
    if not tags_str or tags_str.strip() == '':
        return 'ARRAY[]::TEXT[]'
    
    tags = [t.strip() for t in tags_str.split(',') if t.strip()]
    if not tags:
        return 'ARRAY[]::TEXT[]'
    
    escaped_tags = [f"'{escape_sql_string(tag)}'" for tag in tags]
    return f"ARRAY[{', '.join(escaped_tags)}]"

def generate_seed_sql():
    # Read the CSV file
    csv_path = 'user_read_only_context/text_attachments/Aigent_Smith-Jizx6-Jizx6fTPSHxRKoywvkBPbGV85ChiIh.csv'
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
    
    print(f"[v0] Processing {len(rows)} tools from CSV...")
    
    # Generate SQL in batches
    batch_size = 100
    sql_statements = []
    
    for i in range(0, len(rows), batch_size):
        batch = rows[i:i + batch_size]
        values = []
        
        for row in batch:
            # Skip rows without tool_id or app_name
            if not row.get('tool_id') or not row.get('app_name'):
                continue
            
            tool_id = escape_sql_string(row['tool_id'])
            app_name = escape_sql_string(row['app_name'])
            url = escape_sql_string(row['url'])
            short_desc = escape_sql_string(row['short_description'])
            cat1 = escape_sql_string(row.get('CATEGORY 1', ''))
            cat2 = escape_sql_string(row.get('CATEGORY 2', ''))
            cat3 = escape_sql_string(row.get('CATEGORY 3', ''))
            tags = parse_tags(row.get('TAGS', ''))
            platforms = escape_sql_string(row.get('PLATFORMS', ''))
            promo = escape_sql_string(row.get('promo_code', ''))
            featured = 'TRUE' if row.get('featured_today', '').lower() == 'true' else 'FALSE'
            sponsored = 'TRUE' if row.get('sponsored', '').lower() == 'true' else 'FALSE'
            source = escape_sql_string(row.get('source_name_or_link', ''))
            
            # Generate random ratings for now (between 3.5 and 5.0)
            import random
            star_rating = round(random.uniform(3.5, 5.0), 1)
            review_count = random.randint(10, 5000)
            
            value = f"  ('{tool_id}', '{app_name}', '{url}', '{short_desc}', '{cat1}', '{cat2}', '{cat3}', {tags}, '{platforms}', '{promo}', {featured}, {sponsored}, NOW(), NOW(), '{source}', {star_rating}, {review_count})"
            values.append(value)
        
        if values:
            insert_sql = f"""-- Batch {i//batch_size + 1}: Tools {i+1} to {min(i+batch_size, len(rows))}
INSERT INTO public.ai_tools (tool_id, app_name, url, short_description, category_1, category_2, category_3, tags, platforms, promo_code, featured_today, sponsored, date_added, last_updated, source_name_or_link, star_rating, review_count)
VALUES
{',\n'.join(values)}
ON CONFLICT (tool_id) DO NOTHING;
"""
            sql_statements.append(insert_sql)
    
    # Write the complete SQL file
    full_sql = f"""-- Complete seed data with all {len(rows)} tools from CSV
-- Generated automatically from Aigent_Smith CSV
-- This script will populate the ai_tools table with all available tools

{'\n\n'.join(sql_statements)}

-- Update statistics
ANALYZE public.ai_tools;
"""
    
    output_path = 'scripts/005_seed_all_tools.sql'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(full_sql)
    
    print(f"[v0] Generated {output_path} with {len(rows)} tools in {len(sql_statements)} batches")
    print(f"[v0] Total SQL statements: {len(sql_statements)}")
    print(f"[v0] File ready for execution!")

if __name__ == '__main__':
    generate_seed_sql()

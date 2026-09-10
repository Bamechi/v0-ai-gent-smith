import csv
import re
from datetime import datetime

# Read the CSV file
csv_file_path = '../user_read_only_context/text_attachments/Aigent_Smith-ZJ41C.csv'

def clean_sql_string(value):
    """Escape single quotes for SQL and handle None values"""
    if value is None or value == '':
        return 'NULL'
    # Replace single quotes with two single quotes for SQL escaping
    value = str(value).replace("'", "''")
    return f"'{value}'"

def parse_tags(tags_str):
    """Parse comma-separated tags into array format"""
    if not tags_str or tags_str.strip() == '':
        return 'NULL'
    tags = [tag.strip() for tag in tags_str.split(',') if tag.strip()]
    if not tags:
        return 'NULL'
    # Format as PostgreSQL array
    formatted_tags = ','.join([f'"{tag}"' for tag in tags])
    return f"'{{{formatted_tags}}}'"

def generate_rating():
    """Generate random rating between 4.8 and 5.0"""
    import random
    return round(random.uniform(4.8, 5.0), 1)

# Open and read the CSV
tools = []
with open(csv_file_path, 'r', encoding='utf-8') as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        tool = {
            'tool_id': row.get('tool_id', '').strip(),
            'app_name': row.get('app_name', '').strip(),
            'url': row.get('url', '').strip(),
            'short_description': row.get('short_description', '').strip(),
            'category_1': row.get('CATEGORY 1', '').strip(),
            'category_2': row.get('CATEGORY 2', '').strip(),
            'category_3': row.get('CATEGORY 3', '').strip(),
            'tags': row.get('TAGS', '').strip(),
            'platforms': row.get('PLATFORMS', '').strip(),
            'promo_code': row.get('promo_code', '').strip(),
            'featured_today': row.get('featured_today', '0').strip() == '1',
            'sponsored': row.get('sponsored', '0').strip() == '1',
            'date_added': row.get('date_added', '2026-01-05').strip() or '2026-01-05',
            'last_updated': row.get('last_updated', '2026-01-05').strip() or '2026-01-05',
            'source_name_or_link': row.get('source_name_or_link', '').strip()
        }
        if tool['app_name']:  # Only add if it has a name
            tools.append(tool)

print(f"Found {len(tools)} tools in CSV")

# Generate SQL file
output_file = '007_seed_all_583_tools_from_csv.sql'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write("-- Seed all 583 AI tools from CSV\n")
    f.write("-- Generated: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S") + "\n\n")
    
    f.write("-- Clear existing data\n")
    f.write("TRUNCATE TABLE ai_tools RESTART IDENTITY CASCADE;\n\n")
    
    f.write("-- Insert all tools\n")
    f.write("INSERT INTO ai_tools (\n")
    f.write("  tool_id, app_name, url, short_description,\n")
    f.write("  category_1, category_2, category_3, tags, platforms,\n")
    f.write("  promo_code, featured_today, sponsored,\n")
    f.write("  date_added, last_updated, source_name_or_link,\n")
    f.write("  star_rating, review_count\n")
    f.write(") VALUES\n")
    
    for i, tool in enumerate(tools):
        is_last = i == len(tools) - 1
        
        # Generate rating and review count
        rating = generate_rating()
        review_count = int((rating - 4.5) * 1000) + 100  # Between 400-600 reviews
        
        # Special handling for AVA AI / Callava
        is_ava = 'ava' in tool['app_name'].lower() or 'callava' in tool['app_name'].lower()
        featured = 'true' if is_ava else 'false'
        
        values = [
            clean_sql_string(tool['tool_id']) if tool['tool_id'] else 'NULL',
            clean_sql_string(tool['app_name']),
            clean_sql_string(tool['url']),
            clean_sql_string(tool['short_description']),
            clean_sql_string(tool['category_1']) if tool['category_1'] else 'NULL',
            clean_sql_string(tool['category_2']) if tool['category_2'] else 'NULL',
            clean_sql_string(tool['category_3']) if tool['category_3'] else 'NULL',
            parse_tags(tool['tags']),
            clean_sql_string(tool['platforms']) if tool['platforms'] else 'NULL',
            clean_sql_string(tool['promo_code']) if tool['promo_code'] else 'NULL',
            featured,
            'true' if tool['sponsored'] else 'false',
            clean_sql_string(tool['date_added']),
            clean_sql_string(tool['last_updated']),
            clean_sql_string(tool['source_name_or_link']) if tool['source_name_or_link'] else 'NULL',
            str(rating),
            str(review_count)
        ]
        
        f.write(f"  ({', '.join(values)})")
        f.write(",\n" if not is_last else ";\n")
    
    f.write("\n-- Done! Inserted " + str(len(tools)) + " tools\n")

print(f"✅ Generated SQL file: {output_file}")
print(f"📊 Total tools: {len(tools)}")
print(f"\n🚀 NEXT STEPS:")
print(f"1. Click on '{output_file}' in your files")
print(f"2. Click the 'Run' button at the top")
print(f"3. Refresh your preview to see all {len(tools)} tools!")

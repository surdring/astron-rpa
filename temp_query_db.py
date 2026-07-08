from sqlalchemy import create_engine, text
import urllib.parse

# Database connection string
params = urllib.parse.quote_plus('xqxatcdj')
engine = create_engine(f'postgresql://postgres:{params}@172.16.100.211:5432/insforge')

with engine.connect() as conn:
    # List all tables
    result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
    print('Tables:')
    for row in result:
        print(f'  {row[0]}')
    
    print()
    # Check if api_keys table exists
    result = conn.execute(text("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'api_keys')"))
    exists = result.scalar()
    print(f'api_keys table exists: {exists}')
    
    if exists:
        result = conn.execute(text('SELECT * FROM api_keys'))
        columns = result.keys()
        print(f'Columns: {list(columns)}')
        for row in result:
            print(f'Row: {dict(row)}')
    
    # Also check for secrets or config table
    for tbl in ['secrets', 'config', 'settings', 'project_config', 'app_config', 'insforge_config']:
        result = conn.execute(text(f"SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '{tbl}')"))
        if result.scalar():
            print(f'{tbl} table exists')
            r = conn.execute(text(f'SELECT * FROM {tbl}'))
            for row in r:
                print(f'  {dict(row)}')
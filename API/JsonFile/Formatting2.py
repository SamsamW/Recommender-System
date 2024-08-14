import json

def format_json_file(filepath):
  """
  Reads a JSON file, replaces "]" at the end of each line with a "," (comma),
  and writes the modified content back to the file.
  """
  try:
    # Read the JSON file
    with open(filepath, 'r', encoding='utf-8') as file:
      data = file.read()

    # Modify the data using string manipulation
    modified_data = data.replace(']\n', ',\n')

    # Write the modified data back to the file
    with open(filepath, 'w', encoding='utf-8') as file:
      file.write(modified_data)

    print(f"Successfully formatted JSON file: {filepath}")
  except FileNotFoundError:
    print(f"Error: File not found: {filepath}")
  except Exception as e:
    print(f"Error formatting JSON file: {e}")

# Example usage: Replace 'path/to/your/file.json' with the actual path
format_json_file('JsonFile/Restaurant.json')

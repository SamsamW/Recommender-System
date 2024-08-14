def format_json_file(filepath):
  """
  Reads a JSON file, deletes the first character of each line (assuming it's "["),
  and writes the modified content back to the file.
  """
  try:
    # Read the JSON file line by line (recommended for JSON)
    with open(filepath, 'r', encoding='utf-8') as file:
      modified_lines = [line[1:] for line in file]  # Efficient list comprehension

    # Write the modified lines back to the file
    with open(filepath, 'w', encoding='utf-8') as file:
      file.writelines(modified_lines)

    print(f"Successfully formatted JSON file: {filepath}")
  except FileNotFoundError:
    print(f"Error: File not found: {filepath}")
  except Exception as e:
    print(f"Error formatting JSON file: {e}")

# Example usage: Replace 'path/to/your/file.json' with the actual path
format_json_file('JsonFile/Restaurant.json')

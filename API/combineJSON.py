import json
 
 
def merge_json_files(file_paths, output_file):
    merged_data = []
    for path in file_paths:
        with open(path, 'r') as file:
            data = json.load(file)
            merged_data.append(data)
    with open(output_file, 'w') as outfile:
        json.dump(merged_data, outfile)
 
 
file_paths = ["JsonFile/Hotel 1.json", "JsonFile/Hotel 2.json", "JsonFile/Hotel 3.json", "JsonFile/Hotel 4.json", "JsonFile/Hotel 5.json"]
 
output_file = "JsonFile/mergedHotel.json"
 
merge_json_files(file_paths, output_file)
 
print(f"Merged data written to '{output_file}'")

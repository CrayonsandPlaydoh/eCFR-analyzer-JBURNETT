import requests
import json
import re

# API URL for Federal Register documents
API_URL = "https://www.federalregister.gov/api/v1/documents.json"

# Function to fetch multiple pages of data
def get_federal_register_data(pages=15):  # Adjust 'pages' to fetch more data
    agency_word_counts = {}
    next_page = API_URL  # Start with the first page

    for _ in range(pages):  # Loop through multiple pages
        try:
            # Make API request
            response = requests.get(next_page, timeout=10)
            
            # Check if response is valid
            if response.status_code != 200:
                print(f"❌ API Error: {response.status_code} - {response.reason}")
                break

            data = response.json()

            # Process each document
            for doc in data.get('results', []):
                agency = doc.get('agencies', [{'name': 'Unknown Agency'}])[0]['name']
                text = doc.get('abstract', '')  # Use 'abstract' for word counting
                word_count = len(re.findall(r'\w+', text)) if text else 0

                # Sum word count per agency
                agency_word_counts[agency] = agency_word_counts.get(agency, 0) + word_count

            # Check if there's another page of data
            next_page = data.get('next_page_url')
            if not next_page:
                break  # Stop if no more pages

        except requests.exceptions.RequestException as e:
            print(f"❌ Request failed: {e}")
            break

    return agency_word_counts

# Function to process data and save it to data.json
def process_data():
    agency_word_counts = get_federal_register_data(pages=20)  # Fetch 20 pages

    if not agency_word_counts:
        print("❌ No data received. Exiting script.")
        return

    # Save data to data.json
    with open("data.json", "w") as f:
        json.dump(agency_word_counts, f, indent=4)

    print("✅ Data processing complete! Saved to data.json")

# Run the function
process_data()

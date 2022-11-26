import requests
from bs4 import BeautifulSoup
import openai

def get_essay_from_page(url):
  essay = ''
  response = requests.get(url)
  soup = BeautifulSoup(response.text, 'html.parser')
  post_body = soup.find_all("div", {"class": "post-body entry-content"})
  post_body = post_body[0].findChildren(recursive=False)
  for data in post_body:
    if 'works cited' in data.getText().strip().lower() or 'references' in data.getText().strip().lower() or 'footnotes' in data.getText().strip().lower():
      break
    if data.name == 'h1':
      break
    if data.name != 'p':
      continue
    essay += data.getText().strip().replace("\n", "\\n")
    essay += '\\n\\n'
  essay = essay[:-4]
  return essay

def get_links_from_page(url):
  links = []
  response = requests.get(url)
  soup = BeautifulSoup(response.text, 'html.parser')
  post_body = soup.find_all("div", {"class": "guides-block flex flex-wrap space-between is-samples-page"})
  post_body = post_body[0].findChildren('article', recursive=True)
  for data in post_body:
    link = data.findChildren('a', recursive=True)[0]
    text = link.getText().strip()
    href = link['href']
    links.append((text, href))
  return links

def convert_to_jsonl(title, essay):
  line = '{'
  line += '"prompt": "{}\\n\\n###\\n\\n", "completion": " {}###"'.format(title, essay)
  line += '}'
  return line

def write_line_to_file(line, file_name):
  file = open(file_name, 'a')
  file.write(line)
  file.write('\n')
  file.close()

def scrape_lines(url, file_name):
  links = get_links_from_page(url)
  number = 0
  for link in links:
    number += 1
    essay = get_essay_from_page(link[1])
    prompt = get_prompt(essay)
    line = convert_to_jsonl(prompt, essay)
    print(number, ":", prompt)
    write_line_to_file(line, file_name)

def run_script():
  print('Page', 1)
  scrape_lines('https://academichelp.net/samples/academics/essays/evaluation/', 'test.jsonl')
  list = range(2,4)
  for number in list:
    print('Page', number)
    scrape_lines('https://academichelp.net/samples/academics/essays/evaluation/page/{}'.format(number), 'test.jsonl')

def get_prompt(essay):
  openai.api_key = "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"
  open_ai_prompt = essay + "Write a one sentence prompt for this essay topic as a question:"
  try:
    response = openai.Completion.create(model="text-davinci-002", prompt=open_ai_prompt, temperature=0, max_tokens=100)
    return response.choices[0].text.strip()
  except:
    return "Error"

run_script()

import json

t = {}
with open('CS_res.json', 'r') as f:
    t = json.load(f)

res = {}
for course in t:
    res[course['code']] = course

with open('res.json', 'w+') as f:
    json.dump(res, f)



import base64

with open('main.html', 'r') as f:
    html = f.read()

with open('main.js', 'r') as f:
    js = f.read()

with open('joe.ico', 'rb') as f:
    icon = f.read()
    icon = base64.b64encode(icon)

compiled = html.replace("{{js}}", js)
compiled = compiled.replace("{{icon}}", icon.decode('utf-8'))

with open('joe.html', 'w') as f:
    f.write(compiled)
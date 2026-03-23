with open('/d/git/null/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

old = '''    // ── Quine ──
    const quineSrc = `const quineSrc = \\`\\${quineSrc}\\`; document.getElementById('quine-source').textContent = quineSrc; eval(quineSrc);`;

    document.getElementById('quine-source').textContent = quineSrc;

    const quineOut = quineSrc.replace('document.getElementById(\'quine-source\').textContent = quineSrc; ', '');
    document.getElementById('quine-output').textContent = quineOut;'''

new = '''    // ── Quine ──
    const Q = (f => f.toString().replace(/^.+\n.+\n/, ''))(
      function() { /*
const Q = (f => f.toString().replace(/^.+\n.+\n/, ''))(
  function() { /*
S*/ }); /*'''
*/ }
    );
    const clean = Q.toString().replace(/\/\*[\s\S]*?\*\//, '').trim();
    document.getElementById('quine-source').textContent = clean;
    document.getElementById('quine-output').textContent = clean;'''

if old in content:
    content = content.replace(old, new)
    with open('/d/git/null/index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('Replaced quine successfully')
else:
    print('Old quine not found - showing first 200 chars of search:')
    idx = content.find('// ── Quine')
    print(repr(content[idx:idx+300]))

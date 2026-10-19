from pathlib import Path
from html.parser import HTMLParser

root = Path(__file__).parent
class Check(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs, self.ids = [], []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('src', 'href', 'poster'):
            if key in attrs:
                self.refs.append(attrs[key])
        if 'srcset' in attrs:
            self.refs.extend(s.strip().split()[0] for s in attrs['srcset'].split(','))

check = Check()
check.feed((root / 'index.html').read_text(encoding='utf-8'))
missing = [r for r in check.refs if not r.startswith(('#', 'https:')) and not (root / r).is_file()]
anchors = [r for r in check.refs if r.startswith('#') and r[1:] not in check.ids]
assert not missing, missing
assert not anchors, anchors
assert len(check.ids) == len(set(check.ids)), 'Duplicate IDs'
assert len(list((root / 'assets').glob('*.webp'))) == 12
assert (root / 'assets/filme-conceito.mp4').stat().st_size > 0
print('PASS: arquivos, srcset, poster, ancoras e IDs. Seis imagens em duas resolucoes e um video.')

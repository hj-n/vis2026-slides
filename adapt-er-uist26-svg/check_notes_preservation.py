#!/usr/bin/env python3
"""Check that visual sync preserves user-edited Slidev notes, using an isolated copy."""
from pathlib import Path
import importlib.util
import tempfile

root = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('adapt_er_builder', root / 'build.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)
original = (root.parent / 'decks/adapt-er/slides.md').read_text()
with tempfile.TemporaryDirectory() as temporary:
    builder.REPO = Path(temporary)
    deck = builder.REPO / 'decks/adapt-er'
    deck.mkdir(parents=True)
    markdown = deck / 'slides.md'
    marker = 'USER-EDITED NOTE: keep every word exactly.'
    edited = original.replace('<!--\n', '<!--\n' + marker + '\n\n', 1)
    markdown.write_text(edited)
    before = markdown.read_bytes()
    builder.load_current_notes()
    assert marker in builder.CONTENT[0]['notes']
    builder.sync_slidev()
    assert markdown.read_bytes() == before, 'Visual sync overwrote the user document'
    assert len(list((deck / 'public/slides').glob('*.svg'))) == 13
    markdown.write_text('Unrecognized custom document')
    try:
        builder.load_current_notes()
        raise AssertionError('Expected safe failure on unmappable notes')
    except RuntimeError:
        pass
print('PASS: user-edited notes preserved byte-for-byte; malformed mapping fails safely.')

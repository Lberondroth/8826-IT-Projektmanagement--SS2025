import os

total_lines = 0
# Durch alle Verzeichnisse und Unterverzeichnisse laufen
for root, dirs, files in os.walk("."):
    # Das .git-Verzeichnis von der Suche ausschließen
    if '.git' in dirs:
        dirs.remove('.git')

    for file in files:
        file_path = os.path.join(root, file)
        try:
            # Datei öffnen und Zeilen zählen.
            # 'errors='ignore'' hilft dabei, Nicht-Text-Dateien zu überspringen, die nicht dekodiert werden können.
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                total_lines += len(f.readlines())
        except Exception as e:
            # Eine Fehlermeldung ausgeben, wenn eine Datei aus anderen Gründen nicht verarbeitet werden kann.
            print(f"Fehler beim Verarbeiten der Datei {file_path}: {e}")

print(f"Die Gesamtzahl der Zeilen im Projekt beträgt: {total_lines}")

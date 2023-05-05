# Dokumentation

## Allgemeine Informationen
Name des Projektes: LBB_M295
Autor: Nils Fischer

## Entwicklungsumgebung
Setup: Visual Studio Code, Node.js, Express, eslint



## Endpunkte der API
GET /tasks          Gibt den Screen zurück mit allen Tasks als JSON.
GET /tasks/:id      Gibt die einzelnen Tasks als JSON zurück.
POST /tasks         Erstellt neue Tasks, wobei man "title" definieren muss.
PUT /tasks/:id      Ändert einen Task, wobei man den "title" ändern kann und angeben kann ob man fertig ist, dann ändert es "fullfilled_on" auf die jetztige Zeit.
DELETE /tasks/:id   Löscht den Task dessen Id angegeben wurde.
POST /login         Autorisiert einen Benutzer, wenn er das richtige Passwort eingegeben hat und die E-Mail anforderungen erfüllt. Zudem gibt es einem Erlaubnis Tasks zu sehen und bearbeiten.
GET /verify         Zeigt dem benutzer die Session an oder dass er nicht eingeloggt ist.
DELETE /logout      Loggt den Benutzer ou und nimmt Berechtigungen weg Tasks zu bearbeiten.


